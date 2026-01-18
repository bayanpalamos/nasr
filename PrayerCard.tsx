import React from 'react';
import { PrayerTime } from '../types';

interface PrayerCardProps {
  prayer: PrayerTime;
  isActive: boolean;
  isNext: boolean;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, isActive, isNext }) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
      isActive 
        ? 'bg-emerald-600 text-white shadow-lg scale-[1.02]' 
        : isNext 
          ? 'bg-emerald-50 border-2 border-emerald-200' 
          : 'bg-white border border-gray-100'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : isNext ? 'bg-emerald-500' : 'bg-gray-300'}`} />
        <div>
          <h3 className="font-semibold text-lg">{prayer.name}</h3>
          <p className={`text-sm ${isActive ? 'text-emerald-100' : 'text-gray-500'}`}>{prayer.arabicName}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold tracking-tight">{prayer.time}</span>
      </div>
    </div>
  );
};

export default PrayerCard;
