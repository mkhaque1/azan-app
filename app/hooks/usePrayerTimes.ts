import { useEffect, useState } from 'react';
import { PrayerTimesAPI } from '../services/api';
import useLocation from './useLocation';

import { PrayerTimesResponse } from '../types'; // Adjust the path as needed

type PrayerTimesState = {
  isLoading: boolean;
  error: string | null;
  data: PrayerTimesResponse | null;
  refetch: () => Promise<void>;
};

export default function usePrayerTimes(
  method?: number,
  autoLocation = true
): PrayerTimesState {
  const [state, setState] = useState<PrayerTimesState>({
    isLoading: true,
    error: null,
    data: null,
    refetch: async () => {},
  });

  const { location } = useLocation();

  const fetchPrayerTimes = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      let data;

      if (autoLocation) {
        data = await PrayerTimesAPI.getPrayerTimesAutoLocation();
      } else if (location) {
        data = await PrayerTimesAPI.getPrayerTimes({
          coords: location.coords,
          method,
        });
      } else {
        throw new Error('No location available');
      }

      setState({
        isLoading: false,
        error: null,
        data,
        refetch: fetchPrayerTimes,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null,
        refetch: fetchPrayerTimes,
      });
    }
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, [location?.coords.latitude, location?.coords.longitude, method]);

  return state;
}
