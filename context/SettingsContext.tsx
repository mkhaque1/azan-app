import React, { createContext, useContext, useState } from 'react';

interface SettingsContextProps {
  calendarArabic: boolean;
  setCalendarArabic: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [calendarArabic, setCalendarArabic] = useState(false);

  return (
    <SettingsContext.Provider value={{ calendarArabic, setCalendarArabic }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
