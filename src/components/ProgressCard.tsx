import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface ProgressCardProps {
  totalUnits: number;
  studentName: string;
  studentId: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ totalUnits, studentName, studentId }) => {
  const requiredUnits = 10;
  const progressPercentage = Math.min((totalUnits / requiredUnits) * 100, 100);
  const isComplete = totalUnits >= requiredUnits;

  const getStatusMessage = () => {
    if (isComplete) {
      return "Congratulations! You have met the requirement.";
    }
    const remaining = requiredUnits - totalUnits;
    return `${remaining} more unit${remaining !== 1 ? 's' : ''} to go!`;
  };

  const getProgressColor = () => {
    if (progressPercentage >= 100) return 'from-green-500 to-green-600';
    if (progressPercentage >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-blue-500 to-blue-600';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Co-Curricular Progress Tracker</h1>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <span className="font-semibold">{studentName}</span>
          <span>|</span>
          <span>{studentId}</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4">
          {isComplete ? (
            <Trophy className="w-8 h-8 text-yellow-600" />
          ) : (
            <Target className="w-8 h-8 text-blue-600" />
          )}
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {totalUnits} / {requiredUnits} <span className="text-lg font-normal text-gray-600">Units</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 ease-out rounded-full relative`}
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>0 Units</span>
          <span>{Math.round(progressPercentage)}%</span>
          <span>10 Units</span>
        </div>
      </div>

      <div className="text-center">
        <p className={`font-semibold ${isComplete ? 'text-green-600' : 'text-gray-700'}`}>
          {getStatusMessage()}
        </p>
      </div>
    </div>
  );
};