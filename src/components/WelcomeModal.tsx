import React, { useState } from 'react';
import { GraduationCap, User, Hash } from 'lucide-react';

interface WelcomeModalProps {
  onStart: (name: string, studentId: string) => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && studentId.trim()) {
      onStart(name.trim().toUpperCase(), studentId.trim());
    }
  };

  const isValid = name.trim() && studentId.trim();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 animate-in slide-in-from-bottom-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-6 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ULAB Co-Curricular Office</h1>
          <p className="text-gray-600">Enter your details to access your personalized dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name (BLOCK LETTERS)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
              Student ID
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                placeholder="Enter your student ID"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
              isValid
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isValid ? 'Start Tracking' : 'Fill in all fields'}
          </button>
        </form>
      </div>
    </div>
  );
};