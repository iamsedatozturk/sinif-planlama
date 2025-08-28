/**
 * Language Provider - Dil yönetimi için boş şablon
 * Gerçek i18n entegrasyonu yapılacak
 */
import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string, vars?: Record<string, any>) => string;
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Şimdilik basit pas-through implementasyon
  const t = (key: string, vars?: Record<string, any>): string => {
    // Vars varsa basit template replacement
    let result = key;
    if (vars) {
      Object.entries(vars).forEach(([varKey, value]) => {
        result = result.replace(`{${varKey}}`, String(value));
      });
    }
    return result;
  };

  const contextValue: LanguageContextType = {
    t,
    currentLanguage: 'tr',
    setLanguage: (language: string) => {
      console.log(`Language change requested: ${language}`);
      // TODO: Implement language switching
    }
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useL = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useL must be used within a LanguageProvider');
  }
  return context;
};