export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

export type PrayerTimesResponse = {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Imsak?: string;
    Midnight?: string;
  };
  date: {
    readable: string;
    timestamp: string;
    gregorian: Record<string, unknown>;
    hijri: Record<string, unknown>;
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      id: number;
      name: string;
      params: Record<string, number>;
    };
  };
};
