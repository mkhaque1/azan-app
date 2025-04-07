import { scheduleAzanNotification } from '../services/notifications';

// Define or import the PrayerTimes type
type PrayerTimes = { [key: string]: string }; // Example definition, replace with the actual structure if known

export default function useNotifications() {
  const setupNotifications = async (prayerTimes: PrayerTimes) => {
    // Schedule all prayers
    Object.entries(prayerTimes).forEach(([name, time]) => {
      scheduleAzanNotification(name, new Date(time));
    });
  };

  return { setupNotifications };
}
