import React, { createContext, useContext, useState, ReactNode } from 'react';

type PageSettingContextType = {
  title: string;
  setTitle: (title: string) => void;
};

const PageSettingContext = createContext<PageSettingContextType | undefined>(undefined);

export const PageSettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>("");

  return (
    <PageSettingContext.Provider value={{ title, setTitle }}>
      {children}
    </PageSettingContext.Provider>
  );
};

export const usePageSetting = (): PageSettingContextType => {
  const context = useContext(PageSettingContext);
  if (context === undefined) {
    throw new Error('usePageSetting must be used within a PageSettingProvider');
  }
  return context;
};
