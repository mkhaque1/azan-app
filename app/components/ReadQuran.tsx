import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const ReadQuran = () => {
  const [quranData, setQuranData] = useState<string[]>([]);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuran = async () => {
      try {
        // Load the asset
        const asset = Asset.fromModule(
          require('../../assets/quran/ara-quran-la1.txt')
        );
        console.log('Asset URI:', asset.localUri);
        await asset.downloadAsync();

        // Read the file from the local URI
        const fileContent = await FileSystem.readAsStringAsync(asset.localUri!);
        const surahs = fileContent.split('\n\n'); // Assuming Surahs are separated by double newlines
        setQuranData(surahs);
      } catch (error) {
        console.error('Error reading Quran file:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuran();
  }, []);

  const handleNextSurah = () => {
    if (currentSurahIndex < quranData.length - 1) {
      setCurrentSurahIndex(currentSurahIndex + 1);
    }
  };

  const handleBackSurah = () => {
    if (currentSurahIndex > 0) {
      setCurrentSurahIndex(currentSurahIndex - 1);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="text-zinc-500 mt-4">Loading Quran...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white/90 rounded-lg p-6">
      <Text className="text-lg font-bold text-center mb-4">
        Surah {currentSurahIndex + 1}
      </Text>
      <ScrollView className="mb-4">
        <Text className="text-zinc-700 text-base leading-6">
          {quranData[currentSurahIndex]}
        </Text>
      </ScrollView>
      <View className="flex-row justify-between">
        <TouchableOpacity
          onPress={handleBackSurah}
          disabled={currentSurahIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentSurahIndex === 0 ? 'bg-gray-300' : 'bg-amber-500'
          }`}
        >
          <Text className="text-white font-semibold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextSurah}
          disabled={currentSurahIndex === quranData.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentSurahIndex === quranData.length - 1
              ? 'bg-gray-300'
              : 'bg-amber-500'
          }`}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReadQuran;
