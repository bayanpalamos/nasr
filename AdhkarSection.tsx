import React, { useState, useMemo } from 'react';
import { AdkarItem, Language } from '../types';
import { ADKAR } from '../constants';
import { getT } from '../translations';

interface AdhkarSectionProps {
  language: Language;
}

const AdhkarSection: React.FC<AdhkarSectionProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState<'morning' | 'evening' | 'after_prayer'>('morning');
  const [counts, setCounts] = useState<Record<string, number>>({});
  
  const T = useMemo(() => getT(language), [language]);
  const isRTL = language === 'ar';

  const filteredAdkar = ADKAR.filter(a => a.category === activeCategory);

  const incrementCount = (id: string, max: number) => {
    setCounts(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, max)
    }));
  };

  const resetCounts = () => setCounts({});

  return (
    <div className="space-y-6">
      <div className="flex bg-gray-100 p-1 rounded-xl">
        {(['morning', 'evening', 'after_prayer'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat ? 'bg-white shadow-sm text-emerald-700 font-bold' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat === 'morning' ? T.morning : cat === 'evening' ? T.evening : T.afterPrayer}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAdkar.map(adkar => {
          const current = counts[adkar.id] || 0;
          const isDone = current >= adkar.count;
          
          return (
            <div 
              key={adkar.id}
              onClick={() => incrementCount(adkar.id, adkar.count)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer active:scale-95 ${
                isDone ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-transparent hover:border-emerald-200 shadow-sm'
              }`}
            >
              <p className="font-arabic text-2xl text-right mb-4 text-emerald-900 leading-relaxed" dir="rtl">
                {adkar.arabic}
              </p>
              <p className={`text-gray-600 text-sm mb-4 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                {adkar.text}
              </p>
              <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex gap-1">
                  {[...Array(Math.min(adkar.count, 10))].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < current ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                  ))}
                  {adkar.count > 10 && <span className="text-xs text-gray-400">+{adkar.count - 10}</span>}
                </div>
                <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  {current} / {adkar.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={resetCounts}
        className="w-full py-3 text-gray-400 text-sm font-medium hover:text-emerald-600 transition-colors"
      >
        {T.reset}
      </button>
    </div>
  );
};

export default AdhkarSection;
