import { useState, useEffect } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { PrayerTimes } from '../utils/prayerUtils';

const PRAYER_ORDER: (keyof PrayerTimes)[] = [
  'Fajr',
  'Dhuhr',
  'Asr',
  'Maghrib',
  'Isha',
];

type AlarmCardProps = {
  prayerName: string;
  prayerTime: string;
  isEnabled: boolean;
  onToggle: () => Promise<void>;
};

const AlarmCard = ({
  prayerName,
  prayerTime,
  isEnabled,
  onToggle,
}: AlarmCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle();
    } catch (error) {
      Alert.alert('Error', 'Failed to update alarm');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-row justify-between items-center bg-zinc-800/70 rounded-xl p-4 mb-3">
      <View>
        <Text className="text-white text-lg font-semibold">{prayerName}</Text>
        <Text className="text-zinc-400 text-sm mt-1">{prayerTime}</Text>
      </View>
      <Switch
        trackColor={{ false: '#71717a', true: '#fbbf24' }}
        thumbColor={isEnabled ? '#ffffff' : '#f4f4f5'}
        disabled={isLoading}
        onValueChange={handleToggle}
        value={isEnabled}
      />
    </View>
  );
};

export default function AlarmCards({
  prayerTimes,
  alarms: parentAlarms,
  onAlarmsChange,
}: {
  prayerTimes: PrayerTimes;
  alarms: Record<string, boolean>;
  onAlarmsChange: (alarms: Record<string, boolean>) => void;
}) {
  const [alarms, setAlarms] = useState<Record<string, boolean>>(parentAlarms);

  useEffect(() => {
    setAlarms(parentAlarms); // Sync with parent state
  }, [parentAlarms]);

  const handleToggle = async (prayer: keyof PrayerTimes) => {
    const newValue = !alarms[prayer];
    const updatedAlarms = {
      ...alarms,
      [prayer]: newValue,
    };
    setAlarms(updatedAlarms);
    onAlarmsChange(updatedAlarms); // Notify parent of state change
  };

  return (
    <View className="mt-5 px-4">
      {PRAYER_ORDER.map((prayer) => (
        <AlarmCard
          key={prayer}
          prayerName={prayer}
          prayerTime={prayerTimes[prayer]}
          isEnabled={!!alarms[prayer]}
          onToggle={() => handleToggle(prayer)}
        />
      ))}
    </View>
  );
}
