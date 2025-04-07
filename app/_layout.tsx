import { Stack } from 'expo-router';
import './globals.css';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="PrayerDetailsScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AlarmScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
