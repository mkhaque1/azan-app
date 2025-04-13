import { Stack } from 'expo-router';
import { View } from 'react-native';
import Navigation from '@components/Navigation';
import { SettingsProvider } from '../context/SettingsContext'; // Import SettingsProvider
import './globals.css';

export default function Layout() {
  return (
    <SettingsProvider>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: '#09090b' }, // zinc-950 background
          }}
        >
          {/* Existing Screens */}
          <Stack.Screen
            name="index" // Matches the "index.tsx" file
            options={{
              headerTitle: 'Home', // Custom header title
              animation: 'slide_from_left', // Animation for the screen transition
            }}
          />
          <Stack.Screen
            name="PrayerDetailsScreen" // Matches the "PrayerDetailsScreen.tsx" file
            options={{
              headerTitle: 'Prayer Times', // Custom header title
            }}
          />
          <Stack.Screen
            name="AlarmScreen" // Matches the "AlarmScreen.tsx" file
            options={{
              headerTitle: 'Set Alarm', // Custom header title
            }}
          />

          {/* New Navigation Screens */}
          <Stack.Screen
            name="QiblaScreen" // Matches the "QiblaScreen.tsx" file
            options={{
              headerTitle: 'Qibla', // Custom header title
              animation: 'fade', // Animation for the screen transition
            }}
          />
          <Stack.Screen
            name="SettingsScreen" // Matches the "SettingsScreen.tsx" file
            options={{
              headerTitle: 'Settings', // Custom header title
              animation: 'slide_from_left', // Animation for the screen transition
            }}
          />
        </Stack>

        {/* Navigation Bar - Will appear on all screens */}
        <Navigation />
      </View>
    </SettingsProvider>
  );
}
