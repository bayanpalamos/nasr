
import React from 'react';
import { Languages, X, Check } from 'lucide-react';
import { Language } from '../types';

interface LanguagePickerProps {
  currentLanguage: Language;
  onSelect: (lang: Language) => void;
  onClose: () => void;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ currentLanguage, onSelect, onClose }) => {
  const languages: { id: Language; label: string; native: string }[] = [
    { id: 'fr', label: 'Français', native: 'Français' },
    { id: 'ar', label: 'Arabe', native: 'العربية' },
    { id: 'es', label: 'Espagnol', native: 'Español' },
    { id: 'en', label: 'Anglais', native: 'English' },
    { id: 'de', label: 'Allemand', native: 'Deutsch' },
    { id: 'nl', label: 'Néerlandais', native: 'Nederlands' }
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xs rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Languages size={20} className="text-emerald-400" />
            <h2 className="font-bold">Langue / Sprache / Taal</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-800 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                onSelect(lang.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                currentLanguage === lang.id 
                  ? 'bg-emerald-50 text-emerald-700 font-bold border-2 border-emerald-100' 
                  : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
              }`}
            >
              <div className="text-left">
                <div className="text-sm">{lang.label}</div>
                <div className="text-xs opacity-60">{lang.native}</div>
              </div>
              {currentLanguage === lang.id && <Check size={18} className="text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default LanguagePicker;
