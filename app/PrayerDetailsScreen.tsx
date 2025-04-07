import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Cards from './components/Cards';
import { Link } from 'expo-router';

const { height } = Dimensions.get('window');

export default function PrayerDetailsScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
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

          <Text className="text-center text-zinc-300 mt-6">
            copyright &copy; 2025 khairul haque
          </Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
