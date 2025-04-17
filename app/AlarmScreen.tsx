import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmCards from './components/AlarmCards';
import usePrayerTimes from './hooks/usePrayerTimes';

const { height } = Dimensions.get('window');

export default function AlarmScreen() {
  const { data: prayerTimes } = usePrayerTimes();
  const [alarms, setAlarms] = useState<Record<string, boolean>>({});

  // Load saved alarms from AsyncStorage when the component mounts
  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const savedAlarms = await AsyncStorage.getItem('alarms');
        if (savedAlarms) {
          setAlarms(JSON.parse(savedAlarms));
        }
      } catch (error) {
        console.error('Failed to load alarms:', error);
      }
    };

    loadAlarms();
  }, []);

  // Save alarms to AsyncStorage whenever they change
  useEffect(() => {
    const saveAlarms = async () => {
      try {
        await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
      } catch (error) {
        console.error('Failed to save alarms:', error);
      }
    };

    saveAlarms();
  }, [alarms]);

  if (!prayerTimes?.timings) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center">
        <Text className="text-white">Loading prayer times...</Text>
      </View>
    );
  }

  const handleSaveAlarms = () => {
    // Check if at least one alarm is enabled
    const hasEnabledAlarms = Object.values(alarms).some(
      (isEnabled) => isEnabled
    );

    if (hasEnabledAlarms) {
      Alert.alert('Success', 'Alarms have been saved successfully!');
    } else {
      Alert.alert('Set Alarm', 'Please set at least one alarm before saving.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/home.jpg')}
      resizeMode="cover"
      className="flex-1"
      style={{ height }}
    >
      <View className="flex-1 p-2">
        <Text className="text-white text-2xl mt-10 font-bold mb-6 text-center">
          Prayer Alarms
        </Text>

        <ScrollView className="flex-1">
          <AlarmCards
            prayerTimes={prayerTimes.timings}
            alarms={alarms} // Pass the saved alarms state
            onAlarmsChange={setAlarms} // Pass a callback to update alarms state
          />

          <View className="mt-8 px-4">
            <TouchableOpacity onPress={handleSaveAlarms}>
              <View className="bg-amber-500 rounded-xl px-6 py-3">
                <Text className="text-white font-semibold text-center">
                  Save Alarms
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
