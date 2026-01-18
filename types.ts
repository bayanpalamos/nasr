export type Language = 'fr' | 'ar' | 'es' | 'en' | 'de' | 'nl';

export interface PrayerTime {
  id: string;
  name: string;
  arabicName: string;
  time: string;
}

export interface AdkarItem {
  id: string;
  text: string;
  arabic: string;
  count: number;
  category: 'morning' | 'evening' | 'after_prayer';
}

export interface DuaCategory {
  id: string;
  title: string;
  chapters: number;
  color: string;
  icon: string; // Nom de l'icône Lucide
}

export interface DailyReflection {
  content: string;
  arabicContent: string;
  source?: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

export interface QuranVerse {
  number: number;
  text: string;
  translation: string;
}
