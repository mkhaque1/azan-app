import React, { createContext, useContext, useState } from 'react';

type CalendarContextType = {
  useHijri: boolean;
  toggleHijri: () => void; // Updated to reflect a toggle function
};

const CalendarContext = createContext<CalendarContextType>({
  useHijri: false,
  toggleHijri: () => {}, // Default implementation
});

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [useHijri, setUseHijri] = useState(false);

  const toggleHijri = () => {
    setUseHijri((prev) => !prev); // Toggle the value of useHijri
  };

  return (
    <CalendarContext.Provider value={{ useHijri, toggleHijri }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
