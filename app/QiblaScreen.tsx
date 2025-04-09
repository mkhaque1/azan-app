import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const MAKKAH_LAT = 21.4225;
const MAKKAH_LON = 39.8262;

const QiblaScreen = () => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [heading, setHeading] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [city, setCity] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationAndHeading = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      const angle = calculateQibla(loc.coords.latitude, loc.coords.longitude);
      setQiblaAngle(angle);

      // Fetch city name using reverse geocoding
      const places = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (places && places.length > 0) {
        const place = places[0];
        setCity(place.city || place.region || 'Unknown Location');
      } else {
        setCity('Unknown Location');
      }

      const headingSub = await Location.watchHeadingAsync((data) => {
        setHeading(data.trueHeading ?? data.magHeading);
      });

      return () => headingSub && headingSub.remove();
    };

    fetchLocationAndHeading();
  }, []);

  const calculateQibla = (lat: number, lon: number) => {
    const φ1 = (lat * Math.PI) / 180; // Convert latitude to radians
    const φ2 = (MAKKAH_LAT * Math.PI) / 180; // Convert Makkah latitude to radians
    const Δλ = ((MAKKAH_LON - lon) * Math.PI) / 180; // Difference in longitude in radians

    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
      Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

    let θ = Math.atan2(y, x); // Calculate the angle in radians
    θ = θ * (180 / Math.PI); // Convert to degrees
    return (θ + 360) % 360; // Normalize to 0–360°
  };

  if (errorMsg) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        <Text className="text-red-500 text-lg">{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        <ActivityIndicator color="#fff" />
        <Text className="text-white mt-4">Getting location...</Text>
      </View>
    );
  }

  const direction = (qiblaAngle - heading + 360) % 360;

  return (
    <View className="flex-1 bg-zinc-300 justify-center items-center">
      <Text className="text-amber-800 text-3xl font-bold mb-8">
        Qibla Compass
      </Text>
      <View className="relative justify-center items-center">
        <Image
          source={require('../assets/images/compass.png')}
          className="w-72 h-72"
          style={{ transform: [{ rotate: `${-heading}deg` }] }}
        />
        <Image
          source={require('../assets/images/neddle.png')}
          className="absolute w-72 h-72"
          style={{ transform: [{ rotate: `${direction}deg` }] }}
        />
      </View>
      <Text className="text-zinc-600 text-lg mt-6">
        Qibla is {Math.round(qiblaAngle)}° from North
      </Text>
      {city && (
        <Text className="text-zinc-900 text-4xl font-bold mt-2">{city}</Text>
      )}
    </View>
  );
};

export default QiblaScreen;
