import React, { useState, useEffect } from 'react';
import { WelcomeModal } from './components/WelcomeModal';
import { ProgressCard } from './components/ProgressCard';
import { LifeSkillCard } from './components/LifeSkillCard';
import { ServicesCard } from './components/ServicesCard';
import { CommunityCard } from './components/CommunityCard';
import { ExportCard } from './components/ExportCard';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // Life Skills state
  const [lifeSkillChecked, setLifeSkillChecked] = useState(false);
  
  // Services state
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  
  // Community state
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

  const handleStart = (name: string, id: string) => {
    setStudentName(name);
    setStudentId(id);
    setShowWelcome(false);
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices(prev => [...prev, serviceId]);
    } else {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    }
  };

  const handleClubChange = (clubId: string, checked: boolean) => {
    if (checked) {
      setSelectedClubs(prev => [...prev, clubId]);
    } else {
      setSelectedClubs(prev => prev.filter(id => id !== clubId));
    }
  };

  const calculateTotalUnits = () => {
    let total = 0;
    
    // Life Skills
    if (lifeSkillChecked) total += 2;
    
    // Services and Achievements
    const serviceUnits = {
      'CCC201': 2, 'CCC202': 2, 'CCC203': 4, 'CCC204': 2, 'CCC205': 2,
      'CCC206': 4, 'CCC207': 2, 'CCC208': 2, 'CCC209': 2, 'CCC210': 2
    };
    
    let serviceTotal = 0;
    selectedServices.forEach(serviceId => {
      serviceTotal += serviceUnits[serviceId as keyof typeof serviceUnits] || 0;
    });
    total += Math.min(serviceTotal, 4); // Cap at 4 units
    
    // Community Engagement (max 4 units)
    // Each club participation for 2 semesters = 2 units
    // Maximum 2 clubs = 4 units total
    const communityTotal = Math.min(selectedClubs.length * 2, 4);
    total += communityTotal;
    
    return Math.min(total, 10); // Cap total at 10 units
  };

  // Auto-scroll to top when welcome modal closes
  useEffect(() => {
    if (!showWelcome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showWelcome]);

  if (showWelcome) {
    return <WelcomeModal onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div id="dashboard-content" className="relative">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <ProgressCard 
            totalUnits={calculateTotalUnits()}
            studentName={studentName}
            studentId={studentId}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
            <LifeSkillCard
              isChecked={lifeSkillChecked}
              onChange={setLifeSkillChecked}
            />
            
            <ServicesCard
              selectedServices={selectedServices}
              onChange={handleServiceChange}
            />
            
            <CommunityCard
              selectedClubs={selectedClubs}
              onChange={handleClubChange}
            />
          </div>

          <div className="mt-8">
            <ExportCard studentId={studentId} />
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 University of Liberal Arts Bangladesh - Co-Curricular Office
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;