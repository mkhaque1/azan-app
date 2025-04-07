import * as Notifications from 'expo-notifications';

export const scheduleAzanNotification = async (
  prayerName: string,
  triggerTime: Date
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${prayerName} Azan`,
      sound: 'azan_sound.mp3',
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerTime.getTime(),
    },
  });
};
