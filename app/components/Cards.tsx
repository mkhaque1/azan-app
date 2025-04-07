import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import usePrayerTimes from '../hooks/usePrayerTimes';
import { getNextPrayer } from '../utils/prayerUtils';
import { format, parse } from 'date-fns';

function getTimeRemaining(prayerTime: string): string {
  try {
    const now = new Date();
    const prayerDate = parse(prayerTime, 'HH:mm', now);
    const diff = prayerDate.getTime() - now.getTime();
    if (diff <= 0) return 'Time passed';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  } catch {
    return '--:--';
  }
}

export default function HomeScreen() {
  const { isLoading, error, data: prayerTimes, refetch } = usePrayerTimes();
  const nextPrayer = prayerTimes?.timings
    ? getNextPrayer(prayerTimes.timings)
    : null;

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
                className="bg-zinc-600 rounded-xl p-6 mb-3 flex-row justify-between items-center"
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
        <Text className="text-center text-zinc-300 mt-2">
          Next prayer is in:{' '}
          {nextPrayer ? getTimeRemaining(nextPrayer.time) : '--:--'}
        </Text>
      </View>
    </ScrollView>
  );
}
