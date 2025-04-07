import { Link } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import usePrayerTimes from '../hooks/usePrayerTimes';
import { format, parse } from 'date-fns';

export default function HomeScreen() {
  const { isLoading, error, data: prayerTimes, refetch } = usePrayerTimes();

  // Format time from "HH:mm" to 12-hour format
  const formatPrayerTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    try {
      const time = parse(timeString, 'HH:mm', new Date());
      return format(time, 'h:mm a');
    } catch {
      return timeString; // Fallback to original format if parsing fails
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-900">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4">Fetching prayer times...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-900 px-6">
        <Text className="text-red-400 text-lg mb-4">Error: {error}</Text>
        <TouchableOpacity
          onPress={refetch}
          className="bg-amber-500 rounded-xl px-4 py-2"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          tintColor="white"
        />
      }
    >
      <View className="px-6 py-8">
        {/* Header */}
        <Text className="text-4xl font-semibold text-white mb-2 text-center">
          {prayerTimes?.meta.timezone || 'Your Location'}
        </Text>
        <Text className="text-lg text-zinc-100 mb-8 text-center">
          {prayerTimes?.date.readable || format(new Date(), 'MMMM do, yyyy')}
        </Text>

        {/* Prayer Times Cards */}
        {prayerTimes?.timings && (
          <View className="mb-10">
            {Object.entries({
              Fajr: 'Fajr',
              Dhuhr: 'Dhuhr',
              Asr: 'Asr',
              Maghrib: 'Maghrib',
              Isha: 'Isha',
            }).map(([key, label]) => (
              <View
                key={key}
                className="bg-zinc-600 blur-sm rounded-2xl p-6 mb-3 flex-row justify-between items-center"
              >
                <Text className="text-white text-lg font-medium">{label}</Text>
                <Text className="text-amber-400 text-xl font-bold">
                  {formatPrayerTime(
                    prayerTimes.timings[key as keyof typeof prayerTimes.timings]
                  )}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Get Started Button */}
        <Link href="/PrayerDetailsScreen" asChild>
          <TouchableOpacity className="bg-white rounded-2xl px-6 py-3 shadow-lg">
            <Text className="text-zinc-900 text-lg font-semibold text-center">
              Set Azan Alarm
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Current Prayer Indicator (Bonus) */}
        {prayerTimes?.timings && (
          <Text className="text-center text-zinc-500 mt-6">
            Next: Isha at {formatPrayerTime(prayerTimes.timings.Isha)}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
