import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Cards from './components/Cards';
import { Link } from 'expo-router';
import Calendar from './components/Calendar';
import Carousel from './components/Carousel';

const { height } = Dimensions.get('window');

export default function PrayerDetailsScreen() {
  const [content, setContent] = useState<
    { id: string; type: string; content: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Use mock data
        const mockContent = [
          {
            id: '1',
            type: 'Quran',
            content:
              '“Indeed, prayer prohibits immorality and wrongdoing.”\n— [Quran 29:45]',
          },
          {
            id: '2',
            type: 'Hadith',
            content:
              '“The best among you are those who learn the Qur’an and teach it.”\n— Prophet Muhammad (ﷺ)',
          },
          {
            id: '3',
            type: 'Wisdom',
            content:
              '“And whoever puts their trust in Allah, He will be enough for them.”\n— [Quran 65:3]',
          },
        ];

        setContent(mockContent);
      } catch (error) {
        console.error('Error setting mock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/home.jpg')}
      resizeMode="cover"
      className="flex-1"
      style={{ height }}
    >
      <View className="flex-1 bg-black/50 px-4 pt-10">
        <ScrollView
          className="space-y-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <Cards />

          {/* Fixed Link */}
          <View className="px-4">
            <Link href="/AlarmScreen" asChild>
              <TouchableOpacity
                className="bg-white rounded-xl px-6 py-4 shadow-lg"
                activeOpacity={0.8}
              >
                <Text className="text-zinc-900 text-lg font-semibold text-center">
                  Set Alarm
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View className="mt-8">
            <Calendar />
          </View>

          {/* Carousel with Mock Content */}
          <View className="px-4">
            <Carousel content={content} />
          </View>

          <Text className="text-center text-zinc-300 mt-6">
            copyright &copy; 2025 khairul haque
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
