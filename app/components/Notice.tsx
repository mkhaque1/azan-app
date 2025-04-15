import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Notice = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <View className="absolute inset-0 bg-black/30 z-[99999] align-middle left-0 top-32">
      <View className="bg-red-500 rounded-lg p-6 shadow-lg">
        <Text className="text-white text-center text-lg mb-4">{message}</Text>
        <TouchableOpacity
          onPress={onClose}
          className="bg-white rounded-lg px-4 py-2 self-center"
        >
          <Text className="text-red-500 font-bold">Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notice;
