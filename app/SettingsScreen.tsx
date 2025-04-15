import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Share,
  Modal,
} from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Import Audio API
import { useSettings } from '../context/SettingsContext';
import Member from '@components/Member';
import Notice from '@components/Notice';

const azanOptions = [
  { name: 'Adhan Makkah', file: require('../assets/sounds/azan1.mp3') },
  { name: 'Adhan Madinah', file: require('../assets/sounds/azan2.mp3') },
  { name: 'Adhan Egypt', file: require('../assets/sounds/azan3.mp3') },
  { name: 'Adhan Turkey', file: require('../assets/sounds/azan4.mp3') },
  { name: 'Adhan Indonesia', file: null },
];

export default function SettingsScreen() {
  const { calendarArabic, setCalendarArabic } = useSettings();
  const [selectedAzan, setSelectedAzan] = useState<string>('Adhan Makkah');
  const [location, setLocation] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // State for audio playback
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [isMemberPopupVisible, setIsMemberPopupVisible] = useState(false); // State for Member popup visibility
  const [noticeVisible, setNoticeVisible] = useState(false); // State for Notice visibility

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

    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload sound when the component unmounts
      }
    };
  }, [sound]);

  const handlePlaySound = async (file: any) => {
    if (!file) {
      Alert.alert('Sound not available', 'This Azan sound is not yet added.');
      return;
    }

    try {
      // Unload the previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Create and load the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(file);
      setSound(newSound);

      await newSound.playAsync(); // Play the sound
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Error', 'Failed to play the sound. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out this beautiful Azan App! 🕌\nDownload now: Azan-App',
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
      {/* About Section */}
      <View className="bg-white/10 p-4 rounded-2xl mb-6 border border-white/10">
        <Text className="text-white text-base mb-2">About</Text>
        <Text className="text-zinc-300 text-sm">
          This app is designed to provide you with the best Azan experience.
          Enjoy the beautiful sounds of Azan from different regions.
        </Text>
      </View>
      {/* Azan Sound Picker */}
      <View className="bg-white/10 p-4 rounded-2xl mb-6 border border-white/10">
        <Text className="text-white text-base mb-2">Azan Sound</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)} // Open modal
          className="bg-amber-500 p-3 rounded-xl"
        >
          <Text className="text-white text-center font-bold">
            Set Azan Sound
          </Text>
        </TouchableOpacity>
      </View>
      {/* Notice */}
      {noticeVisible && (
        <Notice
          message="Please subscribe to unlock this feature."
          onClose={() => setNoticeVisible(false)} // Hide the Notice
        />
      )}
      {/* Modal for Azan Sound Picker */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white rounded-lg p-6 w-full max-w-md">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black">
                Set Azan Sound
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Azan Options */}
            {azanOptions.map((option, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between mb-2"
              >
                {/* Play Button */}
                <TouchableOpacity
                  onPress={() => handlePlaySound(option.file)}
                  className="p-3 rounded-xl bg-[#fc9104] mr-2"
                >
                  <Ionicons name="play" size={20} color="white" />
                </TouchableOpacity>

                {/* Azan Option */}
                <TouchableOpacity
                  onPress={() => {
                    if (index >= 2) {
                      setNoticeVisible(true);
                    } else {
                      setSelectedAzan(option.name); // Allow setting Azan for free options
                    }
                  }}
                  className="flex-1 flex-row items-center justify-between p-3 rounded-xl bg-[#fff1c5]"
                >
                  <Text className="text-sm text-black">{option.name}</Text>

                  {/* Checkbox Icon */}
                  {selectedAzan === option.name && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#10b981"
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Modal>
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
      {/* Track Your Prayer Toggle */}
      <View className="flex-row justify-between items-center bg-white/10 p-4 rounded-2xl mb-4 border border-white/10">
        <Text className="text-white text-base">Track your prayer</Text>
        <Switch
          value={false} // Default value
          onValueChange={() => setNoticeVisible(true)} // Show Member popup
          thumbColor="#fff"
          trackColor={{ true: '#10b981', false: '#6b7280' }}
        />
      </View>

      {/* Trigger Member Popup */}
      <TouchableOpacity
        onPressIn={() => setIsMemberPopupVisible(true)} // Show the Member popup
        className="bg-white/10 p-6 rounded-2xl mb-4 border border-white/10"
      >
        <Text className="text-white text-center  font-bold">
          Become a Pro Member
        </Text>
      </TouchableOpacity>
      {/* Member Popup */}
      {isMemberPopupVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMemberPopupVisible}
          onRequestClose={() => setIsMemberPopupVisible(false)} // Close popup
        >
          <View className="flex-1 justify-center items-center bg-black/50 px-6">
            <Member onClose={() => setIsMemberPopupVisible(false)} />
          </View>
        </Modal>
      )}

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
