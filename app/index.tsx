import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-800">
      <Text className="text-4xl font-normal text-white">
        Welcome to Azan Apps
      </Text>
      <Link href="/onboarding">
        <Text className="text-white mt-5 bg-slate-400 text-center ">
          Get started
        </Text>
      </Link>
    </View>
  );
}
