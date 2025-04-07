import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { Coordinates } from '../types'; // Define this type as needed

/**
 * Location Service Utilities
 * Handles all location-related operations including permissions and geocoding
 */

const LOCATION_TIMEOUT = 10000; // 10 seconds

type LocationError = {
  code: string;
  message: string;
};

export const LocationService = {
  /**
   * Request location permissions with detailed error handling
   */
  requestPermissions: async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  },

  /**
   * Get current device coordinates with timeout fallback
   */
  getCurrentCoordinates: async (): Promise<Coordinates> => {
    try {
      const timeoutPromise = new Promise<LocationError>((resolve) =>
        setTimeout(
          () =>
            resolve({ code: 'TIMEOUT', message: 'Location request timed out' }),
          LOCATION_TIMEOUT
        )
      );

      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const result = await Promise.race([locationPromise, timeoutPromise]);

      if ('coords' in result) {
        return {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
          accuracy: result.coords.accuracy,
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Location fetch failed:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Unable to get location'
      );
    }
  },

  /**
   * Reverse geocode coordinates to get address details
   */
  reverseGeocode: async (
    coords: Coordinates
  ): Promise<Location.LocationGeocodedAddress[]> => {
    try {
      return await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      throw new Error('Could not determine address from coordinates');
    }
  },

  /**
   * Get approximate city name from coordinates
   */
  getCityName: async (coords: Coordinates): Promise<string> => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      return addresses[0]?.city || addresses[0]?.region || 'Unknown Location';
    } catch (error) {
      console.error('City name fetch failed:', error);
      return 'Unknown Location';
    }
  },

  /**
   * Show user-friendly location error alerts
   */
  handleLocationError: (error: LocationError | string) => {
    const message = typeof error === 'string' ? error : error.message;

    Alert.alert(
      'Location Service',
      message,
      [{ text: 'OK', onPress: () => console.log('Alert dismissed') }],
      { cancelable: false }
    );
  },
};

// Types
export type { Coordinates };
