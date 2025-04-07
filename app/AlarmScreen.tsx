import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function AlarmScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-zinc-900 p-6">
      <Text className="text-white text-2xl font-bold mb-6">Alarm Settings</Text>

      {/* Your alarm components here */}

      <Link href="../" asChild>
        <TouchableOpacity className="bg-amber-500 rounded-xl px-6 py-3 mt-6">
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
