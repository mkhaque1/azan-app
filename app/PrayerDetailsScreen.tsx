import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Cards from './components/Cards';

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
        <Text className="text-white text-3xl font-semibold text-center mb-6">
          Today's Prayer Times
        </Text>

        <ScrollView className="space-y-4">
          <Cards />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
