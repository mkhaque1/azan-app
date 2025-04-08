import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

const azanOptions = [
  'Adhan Makkah',
  'Adhan Madinah',
  'Adhan Egypt',
  'Adhan Turkey',
  'Adhan Indonesia',
];

export default function SettingsScreen() {
  const [calendarArabic, setCalendarArabic] = useState(true);
  const [selectedAzan, setSelectedAzan] = useState('Adhan Makkah');
  const [location, setLocation] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      const reverse = await Location.reverseGeocodeAsync(loc.coords);
      if (reverse.length > 0) {
        setLocation(reverse[0].city || reverse[0].region);
        setCountry(reverse[0].country);
      }
    })();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out this beautiful Azan App! 🕌\nDownload now: [Your App Link]',
      });
    } catch (error) {
      Alert.alert('Error sharing', (error as Error).message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-900 px-4 pt-12">
      {/* Header */}
      <View className="flex items-center mb-6">
        <Image
          source={require('../assets/images/azan-app.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        <Text className="text-white text-2xl font-bold">Azan App</Text>
        <Text className="text-zinc-400 text-sm mt-1">
          Version {Constants.expoConfig?.version || '1.0.0'}
        </Text>
      </View>

      {/* Location */}
      <View className="bg-white/10 p-4 rounded-2xl mb-4 border border-white/10">
        <Text className="text-white text-base">Current Location:</Text>
        <Text className="text-zinc-300 text-lg font-semibold mt-1">
          {location || 'Fetching...'}, {country || ''}
        </Text>
      </View>

      {/* Calendar Toggle */}
      <View className="flex-row justify-between items-center bg-white/10 p-4 rounded-2xl mb-4 border border-white/10">
        <Text className="text-white text-base">Use Arabic Calendar</Text>
        <Switch
          value={calendarArabic}
          onValueChange={setCalendarArabic}
          thumbColor="#fff"
          trackColor={{ true: '#10b981', false: '#6b7280' }}
        />
      </View>

      {/* Azan Sound Picker */}
      <View className="bg-white/10 p-4 rounded-2xl mb-6 border border-white/10">
        <Text className="text-white text-base mb-2">Choose Azan Sound</Text>
        {azanOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAzan(option)}
            className={`p-3 rounded-xl mb-2 ${
              selectedAzan === option ? 'bg-emerald-600' : 'bg-white/10'
            }`}
          >
            <Text
              className={`text-sm ${
                selectedAzan === option
                  ? 'text-white font-bold'
                  : 'text-zinc-300'
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Share Button */}
      <TouchableOpacity
        onPress={handleShare}
        className="flex-row items-center justify-center mt-2 mb-6"
      >
        <Ionicons name="share-social" size={24} color="white" />
        <Text className="text-white text-base ml-2">
          Share this app with friends
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="items-center pb-6">
        <Text className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} @khairulHaque
        </Text>
      </View>
    </ScrollView>
  );
}
