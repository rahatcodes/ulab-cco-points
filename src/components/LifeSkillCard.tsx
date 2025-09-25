import React from 'react';
import { Brain, CheckCircle } from 'lucide-react';

interface LifeSkillCardProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export const LifeSkillCard: React.FC<LifeSkillCardProps> = ({ isChecked, onChange }) => {
  const getSelectedUnits = () => {
    return isChecked ? 2 : 0;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Life Skill</h3>
          <p className="text-sm text-gray-600">2 Required Units ({getSelectedUnits()}/2 selected)</p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition-all duration-200">
          <div className="relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
              isChecked 
                ? 'bg-purple-600 border-purple-600' 
                : 'border-gray-300 hover:border-purple-400'
            }`}>
              {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-gray-800">CCC100 Course</span>
            <div className="text-sm text-gray-600">
              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                2 Units
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};