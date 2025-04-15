import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Subscribe from './Subscribe';

const Member = ({ onClose }: { onClose: () => void }) => {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  return (
    <View className="absolute left-0 right-0 justify-center items-center px-6">
      <View className="bg-slate-200 rounded-2xl p-6 w-full max-w-md shadow-lg">
        <Text className="text-2xl font-bold text-center mb-2">
          Become a Pro Member
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          Unlock exclusive features and remove ads.
        </Text>

        <View className="flex-row justify-between">
          {/* Dismiss Button */}
          <TouchableOpacity
            className="bg-gray-600 rounded-xl px-6 py-4 flex-1 mr-2"
            activeOpacity={0.8}
            onPress={onClose} // Close the Member popup
          >
            <Text className="text-white text-lg font-semibold text-center">
              Dismiss
            </Text>
          </TouchableOpacity>

          {/* Subscribe Button */}
          <TouchableOpacity
            className="bg-amber-500 rounded-xl px-6 py-4 flex-1 ml-2"
            activeOpacity={0.8}
            onPress={() => setShowSubscribeModal(true)} // Open Subscribe Modal
          >
            <Text className="text-white text-lg font-semibold text-center">
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Subscription Modal */}
      {showSubscribeModal && (
        <Subscribe onClose={() => setShowSubscribeModal(false)} />
      )}
    </View>
  );
};

export default Member;
