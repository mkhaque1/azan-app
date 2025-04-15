import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; // For close icon

const Subscribe = ({ onClose }: { onClose: () => void }) => {
  const [selectedPlan, setSelectedPlan] = useState<
    'monthly' | 'annual' | 'lifetime'
  >('lifetime');

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-amber-900 rounded-3xl p-6 w-full max-w-md relative">
          {/* Close Button */}
          <Pressable className="absolute right-4 top-4 z-10" onPress={onClose}>
            <Ionicons name="close" size={28} color="white" />
          </Pressable>

          {/* Header */}
          <View className="items-center mb-6">
            <Text className="text-white text-lg font-semibold">
              #1 Namaz app
            </Text>
            <Text className="text-white text-sm">
              ⭐⭐⭐⭐⭐ 10+ million 🌍
            </Text>
          </View>

          {/* Title */}
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Remove Ads
          </Text>
          <Text className="text-white text-xl text-center mb-4">
            Unlock Pro Features 🔒
          </Text>

          {/* Description */}
          <Text className="text-white text-center mb-6">
            We appreciate your contribution to our effort. You can get a pro
            membership and support the app 🙌
          </Text>

          {/* Pricing Options */}
          {[
            { key: 'monthly', label: 'Monthly', price: '$ 2,99 / Monthly' },
            { key: 'annual', label: 'Annual', price: '$ 15,99 / Annual' },
            { key: 'lifetime', label: 'Lifetime', price: '$ 25,99 / Lifetime' },
          ].map(({ key, label, price }) => (
            <TouchableOpacity
              key={key}
              className={`rounded-xl p-4 mb-4 border ${
                selectedPlan === key
                  ? 'bg-amber-500 border-amber-700'
                  : 'bg-amber-700 border-amber-600'
              }`}
              onPress={() =>
                setSelectedPlan(key as 'monthly' | 'annual' | 'lifetime')
              }
            >
              <Text className="text-white text-lg font-semibold">{label}</Text>
              <Text className="text-white text-sm">
                {price}. Cancel anytime
              </Text>
            </TouchableOpacity>
          ))}

          {/* Continue Button */}
          <TouchableOpacity
            className="bg-white rounded-xl p-4 mt-2"
            onPress={() => console.log(`Selected: ${selectedPlan}`)}
          >
            <Text className="text-amber-600 text-lg font-bold text-center">
              Continue
            </Text>
          </TouchableOpacity>

          {/* Restore Purchases */}
          <Text className="text-white text-sm text-center mt-4 underline">
            Restore purchases
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Subscribe;
