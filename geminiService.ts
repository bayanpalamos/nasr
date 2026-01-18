import { GoogleGenAI, Type } from "@google/genai";
import { DailyReflection, PrayerTime, QuranVerse, Language } from "../types";

export const getPrayerTimes = async (city: string, country: string, lang: Language): Promise<PrayerTime[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const dateStr = new Date().toLocaleDateString('fr-FR');
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `RECHERCHE INTERNET REQUISE: Donne-moi les horaires de prière ISLAMIQUES PRÉCIS pour ${city}, ${country} pour AUJOURD'HUI (${dateStr}). 
      Réponds UNIQUEMENT au format JSON avec une liste d'objets contenant: id (fajr, sunrise, dhuhr, asr, maghrib, isha), name (en langue: ${lang}), arabicName (en arabe), et time (format HH:mm).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              arabicName: { type: Type.STRING },
              time: { type: Type.STRING }
            },
            required: ["id", "name", "arabicName", "time"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Prayer Times Gemini Error:", error);
    return [
      { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', time: '05:30' },
      { id: 'sunrise', name: 'Sunrise', arabicName: 'الشروق', time: '07:00' },
      { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', time: '13:30' },
      { id: 'asr', name: 'Asr', arabicName: 'العصر', time: '16:30' },
      { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', time: '18:45' },
      { id: 'isha', name: 'Isha', arabicName: 'العشاء', time: '20:15' }
    ];
  }
};

export const getSurahContent = async (surahName: string, lang: Language): Promise<QuranVerse[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Fournis les premiers versets (jusqu'à 15) de la sourate ${surahName} du Coran. 
      Réponds au format JSON: une liste d'objets avec "number" (numéro du verset), "text" (en arabe) et "translation" (en langue: ${lang}).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              number: { type: Type.NUMBER },
              text: { type: Type.STRING },
              translation: { type: Type.STRING }
            },
            required: ["number", "text", "translation"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [{ number: 1, text: "Erreur", translation: "Loading error." }];
  }
};

export const getSpiritualReflection = async (currentPrayer: string, lang: Language): Promise<DailyReflection> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère une courte réflexion spirituelle islamique liée à ${currentPrayer}. Réponds en JSON avec content (en langue: ${lang}) et arabicContent (AR).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            arabicContent: { type: Type.STRING }
          },
          required: ["content", "arabicContent"]
        }
      }
    });
    return JSON.parse(response.text || '{"content": "...", "arabicContent": "..."}');
  } catch (error) {
    return { content: "Patience.", arabicContent: "الصبر" };
  }
};
