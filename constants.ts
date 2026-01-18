import { PrayerTime, AdkarItem, Surah, DuaCategory } from './types';

export const DEFAULT_CITY = "Palamós";
export const DEFAULT_COUNTRY = "Espagne";

export const DUA_CATEGORIES: DuaCategory[] = [
  { id: 'allah', title: 'Allah', chapters: 9, color: 'bg-[#e0f2f1]', icon: 'Heart' },
  { id: 'umrah', title: 'Umrah', chapters: 8, color: 'bg-[#e8f5e9]', icon: 'Tent' },
  { id: 'voyage', title: 'Voyage', chapters: 11, color: 'bg-[#fffde7]', icon: 'Plane' },
  { id: 'joie', title: 'Joie & Détresse', chapters: 15, color: 'bg-[#fff9c4]', icon: 'Users' },
  { id: 'nature', title: 'Nature', chapters: 10, color: 'bg-[#fffde7]', icon: 'Leaf' },
  { id: 'comportement', title: 'Bon Comportement', chapters: 20, color: 'bg-[#fff9c4]', icon: 'ThumbsUp' },
  { id: 'famille', title: 'Maison & Famille', chapters: 14, color: 'bg-[#e1f5fe]', icon: 'Home' },
  { id: 'manger', title: 'Manger & Boire', chapters: 7, color: 'bg-[#e1f5fe]', icon: 'Utensils' },
  { id: 'maladie', title: 'Maladie & Mort', chapters: 13, color: 'bg-[#f5f5f5]', icon: 'Stethoscope' },
];

export const SURAHS: Surah[] = [
  { number: 1, name: "Al-Fatiha", englishName: "L'Ouverture", numberOfAyahs: 7 },
  { number: 2, name: "Al-Baqara", englishName: "La Vache", numberOfAyahs: 286 },
  { number: 3, name: "Al-Imran", englishName: "La Famille d'Imran", numberOfAyahs: 200 },
  { number: 18, name: "Al-Kahf", englishName: "La Caverne", numberOfAyahs: 110 },
  { number: 36, name: "Ya-Sin", englishName: "Ya-Sin", numberOfAyahs: 83 },
  { number: 55, name: "Ar-Rahman", englishName: "Le Tout-Miséricordieux", numberOfAyahs: 78 },
  { number: 56, name: "Al-Waqi'a", englishName: "L'Événement", numberOfAyahs: 96 },
  { number: 67, name: "Al-Mulk", englishName: "La Royauté", numberOfAyahs: 30 },
  { number: 112, name: "Al-Ikhlas", englishName: "Le Monothéisme Pur", numberOfAyahs: 4 },
  { number: 113, name: "Al-Falaq", englishName: "L'Aube Naissante", numberOfAyahs: 5 },
  { number: 114, name: "An-Nas", englishName: "Les Hommes", numberOfAyahs: 6 }
];

export const ADKAR: AdkarItem[] = [
  { id: 'm1', category: 'morning', text: "Au nom d'Allah, par Son nom rien ne peut nuire sur terre ni au ciel.", arabic: "بِسْمِ اللَّهِ الَّذِي لا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3 },
  { id: 'm2', category: 'morning', text: "Gloire et pureté à Allah et par Sa louange.", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100 },
  { id: 'm3', category: 'morning', text: "Je suis satisfait d'Allah comme Seigneur, de l'Islam comme religion.", arabic: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلَامِ دِيناً، وَبِمُحَمَّدٍ نَبِيَّاً", count: 3 },
  { id: 'e1', category: 'evening', text: "Je cherche protection par les paroles parfaites d'Allah contre le mal.", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3 },
  { id: 'a1', category: 'after_prayer', text: "Astaghfiroullah (Je demande pardon à Allah).", arabic: "أَسْتَغْفِرُ اللَّهَ", count: 3 }
];
