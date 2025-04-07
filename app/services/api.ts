import axios from 'axios';
import { Coordinates } from '../types';
import { LocationService } from './location';

const BASE_URL = 'https://api.aladhan.com/v1';

type PrayerTimesResponse = {
  timings: Record<string, string>;
  date: {
    readable: string;
    timestamp: string;
  };
  meta: {
    method: {
      id: number;
      name: string;
    };
  };
};

type PrayerTimesParams = {
  coords: Coordinates;
  method?: number;
  school?: number;
  adjustment?: number;
};

export const PrayerTimesAPI = {
  /**
   * Fetch prayer times for current day based on coordinates
   */
  getPrayerTimes: async ({
    coords,
    method = 2, // ISNA default
    school = 0, // Shafi
    adjustment = 0,
  }: PrayerTimesParams): Promise<PrayerTimesResponse> => {
    try {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const response = await axios.get(
        `${BASE_URL}/timings/${day}-${month}-${year}`,
        {
          params: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            method,
            school,
            adjustment,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed to fetch prayer times'
          : 'Network error'
      );
    }
  },

  /**
   * Get calculation methods metadata
   */
  getMethods: async () => {
    const response = await axios.get(`${BASE_URL}/methods`);
    return response.data.data;
  },

  /**
   * Auto-fetch prayer times using device location
   */
  getPrayerTimesAutoLocation: async () => {
    try {
      const hasPermission = await LocationService.requestPermissions();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const coords = await LocationService.getCurrentCoordinates();
      return await PrayerTimesAPI.getPrayerTimes({ coords });
    } catch (error) {
      console.error('Auto-location failed:', error);
      throw error;
    }
  },
};

// Optional: Caching layer
const cache: Record<string, PrayerTimesResponse> = {};

export const CachedPrayerTimesAPI = {
  ...PrayerTimesAPI,
  getPrayerTimes: async (params: PrayerTimesParams) => {
    const cacheKey = `${params.coords.latitude},${params.coords.longitude}-${params.method}`;

    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    const data = await PrayerTimesAPI.getPrayerTimes(params);
    cache[cacheKey] = data;
    return data;
  },
};
