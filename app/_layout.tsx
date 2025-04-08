import { Stack } from 'expo-router';
import { View } from 'react-native';
import Navigation from '@components/Navigation';
import './globals.css';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#09090b' }, // zinc-950 background
        }}
      >
        {/* Existing Screens */}
        <Stack.Screen name="index" />
        <Stack.Screen name="PrayerDetailsScreen" />
        <Stack.Screen name="AlarmScreen" />

        {/* New Navigation Screens */}
        <Stack.Screen name="qibla" />
        <Stack.Screen name="settings" />
      </Stack>

      {/* Navigation Bar - Will appear on all screens */}
      <Navigation />
    </View>
  );
}
