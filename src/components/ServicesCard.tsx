import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

interface ServicesCardProps {
  selectedServices: string[];
  onChange: (serviceId: string, checked: boolean) => void;
}

const services = [
  { id: 'CCC201', name: 'Duke of Edinburgh Award (Bronze)', units: 2 },
  { id: 'CCC202', name: 'Duke of Edinburgh Award (Silver)', units: 2 },
  { id: 'CCC203', name: 'Duke of Edinburgh Award (Gold)', units: 4 },
  { id: 'CCC204', name: 'Social and Community Services', units: 2 },
  { id: 'CCC205', name: '60 hours / 3 social service events', units: 2 },
  { id: 'CCC206', name: '90 hours / 5 months volunteering experiences', units: 4 },
  { id: 'CCC207', name: 'Awards achieved in any national level/ international level competition', units: 2 },
  { id: 'CCC208', name: 'Specialized and Professional Skill', units: 2 },
  { id: 'CCC209', name: 'Foreign Language other than English (At least basic level with certification)', units: 2 },
  { id: 'CCC210', name: 'Significant leadership trait: Achieved position in Executive body of any ULAB club', units: 2 },
];

export const ServicesCard: React.FC<ServicesCardProps> = ({ selectedServices, onChange }) => {
  const calculateSelectedUnits = () => {
    const serviceUnits = {
      'CCC201': 2, 'CCC202': 2, 'CCC203': 4, 'CCC204': 2, 'CCC205': 2,
      'CCC206': 4, 'CCC207': 2, 'CCC208': 2, 'CCC209': 2, 'CCC210': 2
    };
    
    let total = 0;
    selectedServices.forEach(serviceId => {
      total += serviceUnits[serviceId as keyof typeof serviceUnits] || 0;
    });
    return Math.min(total, 4);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Services and Achievements</h3>
          <p className="text-sm text-gray-600">4 Required Units ({calculateSelectedUnits()}/4 selected)</p>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {services.map((service) => {
          const isChecked = selectedServices.includes(service.id);
          return (
            <label
              key={service.id}
              className="flex items-start gap-3 p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50/50 cursor-pointer transition-all duration-200"
            >
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => onChange(service.id, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked 
                    ? 'bg-green-600 border-green-600' 
                    : 'border-gray-300 hover:border-green-400'
                }`}>
                  {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-800 text-sm leading-tight">{service.name}</span>
                <div className="mt-1">
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {service.units} Unit{service.units > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};