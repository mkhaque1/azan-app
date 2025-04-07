import { Link } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-zinc-900 px-6">
      <Text className="text-4xl font-semibold text-white mb-4 text-center">
        Welcome to Azan App
      </Text>
      <Text className="text-lg text-zinc-400 mb-10 text-center">
        Your daily prayer times, always on time.
      </Text>

      <Link href="/PrayerDetailsScreen" asChild>
        <TouchableOpacity className="bg-white rounded-2xl px-6 py-3 shadow-lg">
          <Text className="text-zinc-900 text-lg font-semibold">
            Get Started
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
