import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SURAHS } from '../constants';
import { getSurahContent } from '../services/geminiService';
import { QuranVerse, Surah, Language } from '../types';
import { ChevronLeft, BookOpen, Loader2, Play, Pause, Search, Music } from 'lucide-react';
import { getT } from '../translations';

interface QuranSectionProps {
  language: Language;
}

const QuranSection: React.FC<QuranSectionProps> = ({ language }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<QuranVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const T = useMemo(() => getT(language), [language]);
  const isRTL = language === 'ar';

  useEffect(() => {
    if (selectedSurah) {
      setLoading(true);
      getSurahContent(selectedSurah.name, language).then(data => {
        setVerses(data);
        setLoading(false);
      });
      
      const paddedNumber = selectedSurah.number.toString().padStart(3, '0');
      const audioUrl = `https://server8.mp3quran.net/afs/${paddedNumber}.mp3`;
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = audioUrl;
        setIsPlaying(false);
      } else {
        audioRef.current = new Audio(audioUrl);
      }

      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [selectedSurah, language]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const filteredSurahs = SURAHS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.number.toString() === searchTerm
  );

  if (selectedSurah) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => {
              if (audioRef.current) audioRef.current.pause();
              setIsPlaying(false);
              setSelectedSurah(null);
            }}
            className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
          >
            <ChevronLeft size={20} className={isRTL ? 'ml-1' : 'mr-1'} />
            {T.back}
          </button>
          
          <button 
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all shadow-md ${
              isPlaying ? 'bg-amber-100 text-amber-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : T.listen}
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-emerald-900">{selectedSurah.name}</h2>
            <p className="text-gray-500">{selectedSurah.englishName} • {selectedSurah.numberOfAyahs} {isRTL ? 'آية' : 'Versets'}</p>
            {isPlaying && (
              <div className="mt-2 flex justify-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 bg-emerald-500 animate-pulse" style={{ height: `${Math.random() * 20 + 5}px`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-emerald-600">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="text-sm">{T.loadingQuran}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {verses.map(v => (
                <div key={v.number} className="space-y-4 border-b border-gray-50 pb-6 last:border-0">
                  <div className={`flex justify-between items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {v.number}
                    </span>
                    <p className="font-arabic text-3xl text-right leading-loose text-emerald-950" dir="rtl">
                      {v.text}
                    </p>
                  </div>
                  <p className={`text-gray-600 text-sm italic leading-relaxed ${isRTL ? 'pr-12' : 'pl-12'}`}>
                    {v.translation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={18} />
        <input 
          type="text" 
          placeholder={T.searchSurah}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:border-emerald-500 outline-none transition-all text-sm`}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-1 pb-4 custom-scrollbar">
        {filteredSurahs.map(surah => (
          <button
            key={surah.number}
            onClick={() => setSelectedSurah(surah)}
            className="bg-white p-4 rounded-2xl flex items-center justify-between hover:border-emerald-300 border border-transparent transition-all shadow-sm group active:scale-[0.98]"
          >
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors font-bold text-sm">
                {surah.number}
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h3 className="font-bold text-gray-800 text-sm">{surah.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{surah.englishName} • {surah.numberOfAyahs} v.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Music size={14} className="text-gray-200 group-hover:text-emerald-400" />
               <BookOpen size={16} className="text-gray-300 group-hover:text-emerald-500" />
            </div>
          </button>
        ))}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default QuranSection;
