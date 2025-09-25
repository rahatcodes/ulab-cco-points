import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

interface CommunityCardProps {
  selectedClubs: string[];
  onChange: (clubId: string, checked: boolean) => void;
}

const clubs = [
  { id: 'CCC301', name: 'ULAB Adventure Club' },
  { id: 'CCC302', name: 'ULAB Art and Photography Club' },
  { id: 'CCC303', name: 'ULAB Business Club' },
  { id: 'CCC304', name: 'ULAB Computer Club (Programming Club)' },
  { id: 'CCC305', name: 'ULAB Chess Club' },
  { id: 'CCC306', name: 'ULAB Debating Club' },
  { id: 'CCC307', name: 'ULAB Electronics Club (Robotics)' },
  { id: 'CCC308', name: 'ULAB Field Sports Club' },
  { id: 'CCC309', name: 'ULAB Film Club' },
  { id: 'CCC310', name: 'ULAB Indoor Games Club' },
  { id: 'CCC311', name: 'ULAB Language Club' },
  { id: 'CCC312', name: 'Paper Canoe - ULAB Literary Society' },
  { id: 'CCC313', name: 'ULAB Media Club' },
  { id: 'CCC314', name: 'ULAB Model United Nations' },
  { id: 'CCC315', name: 'ULAB Nutrition and Wellness Club' },
  { id: 'CCC316', name: 'ULAB Shangskriti Shangshad' },
  { id: 'CCC317', name: 'ULAB Social Welfare Club' },
  { id: 'CCC318', name: 'ULAB Sustainable Development Club' },
  { id: 'CCC319', name: 'ULAB Cine Club' },
  { id: 'CCC320', name: 'ULAB Rotaract Club' },
  { id: 'CCC321', name: 'ULAB YES' },
  { id: 'CCC322', name: 'ULAB History Club' },
  { id: 'CCC323', name: 'ULAB Digital Marketing Club' },
  { id: 'CCC324', name: 'ULAB Kaleidoscope' },
];

export const CommunityCard: React.FC<CommunityCardProps> = ({ 
  selectedClubs, 
  onChange 
}) => {
  const getSelectedUnits = () => {
    return Math.min(selectedClubs.length * 2, 4);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Community Engagement</h3>
          <p className="text-sm text-gray-600">4 Required Units ({getSelectedUnits()}/4 selected)</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-3">
          Select clubs where you have active membership for 2 semesters (2 units each, max 2 clubs)
        </p>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {clubs.map((club) => {
          const isChecked = selectedClubs.includes(club.id);
          const isDisabled = !isChecked && selectedClubs.length >= 2;
          
          return (
            <label
              key={club.id}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                isDisabled 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer'
              }`}
            >
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(e) => onChange(club.id, e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  isChecked 
                    ? 'bg-blue-600 border-blue-600' 
                    : isDisabled
                    ? 'border-gray-300 bg-gray-100'
                    : 'border-gray-300 hover:border-blue-400'
                }`}>
                  {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className={`font-medium text-sm leading-tight ${
                  isDisabled ? 'text-gray-400' : 'text-gray-800'
                }`}>
                  {club.id} - {club.name}
                </span>
                <div className="mt-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    isDisabled 
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    2 Units (2 semesters)
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