
import React, { useState, useMemo } from 'react';
import { Search, Heart, Tent, Plane, Users, Leaf, ThumbsUp, Home, Utensils, Stethoscope } from 'lucide-react';
import { Language } from '../types';
import { DUA_CATEGORIES } from '../constants';
import { getT } from '../translations';

interface DuasSectionProps {
  language: Language;
}

const iconMap: Record<string, any> = {
  Heart, Tent, Plane, Users, Leaf, ThumbsUp, Home, Utensils, Stethoscope
};

const DuasSection: React.FC<DuasSectionProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'myDuas'>('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const T = useMemo(() => getT(language), [language]);
  const isRTL = language === 'ar';

  const filteredCategories = DUA_CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
        <input 
          type="text" 
          placeholder={T.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-3.5 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 transition-all text-sm`}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCategories.map(cat => {
          const Icon = iconMap[cat.icon] || Heart;
          return (
            <div 
              key={cat.id}
              className={`${cat.color} p-5 rounded-3xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all shadow-sm border border-black/5 h-36 flex flex-col justify-between`}
            >
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight">{cat.title}</h3>
                <p className="text-[10px] text-gray-500 font-medium">{cat.chapters} {T.chapters}</p>
              </div>
              
              <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} opacity-80 group-hover:scale-110 transition-transform`}>
                {cat.id === 'allah' ? (
                  <span className="font-arabic text-3xl font-bold text-emerald-800">الله</span>
                ) : (
                  <Icon size={48} className="text-black/10" strokeWidth={1.5} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DuasSection;
