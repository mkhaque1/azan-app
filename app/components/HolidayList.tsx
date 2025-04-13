import React from 'react';
import { View, Text } from 'react-native';

// Example list of Islamic holidays
const islamicHolidays = [
  { date: '1', month: 'Muharram', name: 'Islamic New Year' },
  { date: '10', month: 'Muharram', name: 'Day of Ashura' },
  {
    date: '12',
    month: 'Rabi al-Awwal',
    name: 'Mawlid al-Nabi (Prophet’s Birthday)',
  },
  { date: '27', month: 'Rajab', name: 'Isra and Mi’raj' },
  { date: '1', month: 'Ramadan', name: 'Start of Ramadan' },
  { date: '27', month: 'Ramadan', name: 'Laylat al-Qadr' },
  { date: '1', month: 'Shawwal', name: 'Eid al-Fitr' },
  { date: '10', month: 'Dhu al-Hijjah', name: 'Eid al-Adha' },
];

const HolidayList = ({
  selectedDay,
  selectedMonth,
}: {
  selectedDay: string | null;
  selectedMonth: string | null;
}) => {
  // Filter holidays based on the selected day and month
  const holidays = islamicHolidays.filter(
    (holiday) => holiday.date === selectedDay && holiday.month === selectedMonth
  );

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Holidays on {selectedDay} {selectedMonth}
      </Text>
      {holidays.length > 0 ? (
        holidays.map((holiday, index) => (
          <Text key={index} style={{ fontSize: 16 }}>
            - {holiday.name}
          </Text>
        ))
      ) : (
        <Text style={{ fontSize: 16, color: 'gray' }}>
          No Islamic holidays or occasions on this day.
        </Text>
      )}
    </View>
  );
};

export default HolidayList;
