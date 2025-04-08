import { View, TouchableOpacity, Text } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const navItems = [
  {
    name: 'Home',
    icon: (active: boolean) => (
      <Ionicons
        name={active ? 'home' : 'home-outline'}
        size={24}
        color={active ? '#f59e0b' : '#71717a'}
      />
    ),
    route: '/',
  },
  {
    name: 'Prayer Times',
    icon: (active: boolean) => (
      <Ionicons
        name={active ? 'time' : 'time-outline'}
        size={24}
        color={active ? '#f59e0b' : '#71717a'}
      />
    ),
    route: '/PrayerDetailsScreen',
  },
  {
    name: 'Qibla',
    icon: (active: boolean) => (
      <Ionicons
        name={active ? 'compass' : 'compass-outline'}
        size={24}
        color={active ? '#f59e0b' : '#71717a'}
      />
    ),
    route: '/QiblaScreen',
  },
  {
    name: 'Alarms',
    icon: (active: boolean) => (
      <Ionicons
        name={active ? 'alarm' : 'alarm-outline'}
        size={24}
        color={active ? '#f59e0b' : '#71717a'}
      />
    ),
    route: '/AlarmScreen',
  },
  {
    name: 'Settings',
    icon: (active: boolean) => (
      <Ionicons
        name={active ? 'settings' : 'settings-outline'}
        size={24}
        color={active ? '#f59e0b' : '#71717a'}
      />
    ),
    route: '/SettingsScreen',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <View className="flex-row justify-around items-center py-3 bg-zinc-900 border-t border-zinc-700">
      {navItems.map((item) => (
        <Link key={item.route} href={item.route as any} asChild>
          <TouchableOpacity className="items-center px-3 py-1">
            {item.icon(pathname === item.route)}
            <Text
              className={`text-xs mt-1 ${
                pathname === item.route ? 'text-amber-500' : 'text-zinc-500'
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
