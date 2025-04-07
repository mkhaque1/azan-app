import { format, parse } from 'date-fns';

export const formatPrayerTime = (timeString?: string) => {
  if (!timeString) return '--:--';
  try {
    const time = parse(timeString, 'HH:mm', new Date());
    return format(time, 'h:mm a');
  } catch {
    return timeString;
  }
};

export const getCurrentPrayer = (timings: Record<string, string>) => {
  // Implementation logic to determine current prayer
  return { current: 'Asr', next: 'Maghrib' }; // Example
};
