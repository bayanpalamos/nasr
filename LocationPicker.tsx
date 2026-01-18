
import React, { useState, useMemo } from 'react';
import { MapPin, X, Check } from 'lucide-react';
import { Language } from '../types';
import { getT } from '../translations';

interface LocationPickerProps {
  currentCity: string;
  currentCountry: string;
  language: Language;
  onSave: (city: string, country: string) => void;
  onClose: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ currentCity, currentCountry, language, onSave, onClose }) => {
  const [city, setCity] = useState(currentCity);
  const [country, setCountry] = useState(currentCountry);
  const T = useMemo(() => getT(language), [language]);
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(city, country);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xs rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <MapPin size={20} className="text-emerald-400" />
            <h2 className="font-bold">{T.changeLocation}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ${isRTL ? 'mr-1' : 'ml-1'}`}>{T.city}</label>
            <input 
              type="text" 
              value={city}
              dir={isRTL ? 'rtl' : 'ltr'}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-emerald-500 outline-none transition-all text-gray-700"
              placeholder="Ex: Palamós"
            />
          </div>
          <div>
            <label className={`block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ${isRTL ? 'mr-1' : 'ml-1'}`}>{T.country}</label>
            <input 
              type="text" 
              value={country}
              dir={isRTL ? 'rtl' : 'ltr'}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-3 focus:border-emerald-500 outline-none transition-all text-gray-700"
              placeholder="Ex: Espagne"
            />
          </div>
          <button 
            type="submit"
            className={`w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95 mt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <Check size={20} />
            {T.confirm}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationPicker;
