import { parse, format, isAfter, isBefore } from 'date-fns';

export type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export const getNextPrayer = (
  timings: PrayerTimes
): { name: string; time: string } | null => {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  // Convert all prayer times to Date objects for today
  const prayerEntries = Object.entries(timings).map(([name, time]) => ({
    name,
    time,
    date: parse(time, 'HH:mm', now),
  }));

  // Find prayers occurring later today
  const upcomingToday = prayerEntries.filter(({ date }) =>
    isAfter(date, parse(currentTime, 'HH:mm', now))
  );

  // If none found, return first prayer of next day (Fajr)
  if (upcomingToday.length === 0) {
    return {
      name: 'Fajr (Tomorrow)',
      time: timings.Fajr,
    };
  }

  // Return the nearest upcoming prayer
  return upcomingToday.reduce((nearest, current) =>
    isBefore(current.date, nearest.date) ? current : nearest
  );
};
