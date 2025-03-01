
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, categoryTranslations, regionTranslations } from '@/utils/translations';

type LanguageContextType = {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: keyof typeof translations.ar) => string;
  translateCategory: (category: string) => string;
  translateRegion: (region: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    // تعيين اتجاه الصفحة بناءً على اللغة
    document.documentElement.setAttribute('lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: keyof typeof translations.ar): string => {
    return translations[language][key];
  };

  const translateCategory = (category: string): string => {
    return categoryTranslations[category]?.[language] || category;
  };

  const translateRegion = (region: string): string => {
    return regionTranslations[region]?.[language] || region;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateCategory, translateRegion }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
