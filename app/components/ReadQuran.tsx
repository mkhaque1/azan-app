import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReadQuranProps {
  onClose: () => void;
  content: any[]; // Pass the Quran data (e.g., JSON or parsed content)
}

const ReadQuran: React.FC<ReadQuranProps> = ({ onClose, content }) => {
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [surahs, setSurahs] = useState<any[]>([]);

  const { height } = Dimensions.get('window'); // Get screen height

  useEffect(() => {
    setSurahs(content);
    setLoading(false);
  }, [content]);

  const handleNextSurah = () => {
    if (currentSurahIndex < surahs.length - 1) {
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

  const currentSurah = surahs[currentSurahIndex];

  return (
    <View
      style={{ height: height * 0.7 }} // Set height to 80% of the screen
      className="w-full bg-zinc-800 rounded-lg p-6 m-4"
    >
      {/* Close Button */}
      <TouchableOpacity
        onPress={onClose}
        className="absolute top-4 right-4 z-10"
      >
        <Ionicons name="close-circle" size={32} color="#f87171" />
      </TouchableOpacity>

      {/* Surah Title */}
      <Text className="text-2xl text-white font-bold text-center mb-4">
        Surah - {currentSurah.surah_name}
      </Text>

      {/* Surah Content */}
      <ScrollView className="mb-4">
        {currentSurah?.ayahs?.length > 0 ? (
          <Text
            className={`${
              content === require('../../assets/quran/merged-ar-en.json')
                ? ' font-arabic text-white tracking-[2px] text-right'
                : content === require('../../assets/quran/banglaquran.json')
                ? 'font-bangla text-white'
                : 'text-white'
            } text-lg font-light`}
          >
            {content === require('../../assets/quran/banglaquran.json')
              ? currentSurah.ayahs
                  .map((a: any) => `${a.ayah}. ${a.text}`) // Bengali Quran
                  .join('\n\n')
              : currentSurah.ayahs
                  .map((a: any) => `${a.ayah}. ${a.arabic}\n${a.english}`) // Merged Quran
                  .join('\n\n')}
          </Text>
        ) : (
          <Text className="text-white text-center">
            No verses available for this Surah.
          </Text>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="flex-row gap-4 justify-between">
        <TouchableOpacity
          onPress={handleBackSurah}
          disabled={currentSurahIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentSurahIndex === 0 ? 'bg-gray-300' : 'bg-amber-500'
          }`}
        >
          <Text
            className={`${
              currentSurahIndex === 0 ? 'text-gray-500' : 'text-white'
            } font-semibold`}
          >
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextSurah}
          disabled={currentSurahIndex === surahs.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentSurahIndex === surahs.length - 1
              ? 'bg-gray-300'
              : 'bg-amber-500'
          }`}
        >
          <Text
            className={`${
              currentSurahIndex === surahs.length - 1
                ? 'text-gray-500'
                : 'text-white'
            } font-semibold`}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReadQuran;
