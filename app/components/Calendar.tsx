import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import moment from 'moment';
import 'moment-hijri';
import { useCalendar } from '../context/CalendarContext'; // Correct import
import HolidayList from './HolidayList';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const { useHijri } = useCalendar(); // Get the useHijri state from context
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isHijri = useHijri; // Use the context value to toggle between calendars
  const monthName = isHijri
    ? currentDate.format('iMMMM iYYYY') // Arabic (Hijri) month name
    : currentDate.format('MMMM YYYY'); // English month name

  const firstDay = isHijri
    ? moment(currentDate).startOf('iMonth') // Start of Hijri month
    : moment(currentDate).startOf('month'); // Start of Gregorian month

  const daysInMonth = isHijri
    ? firstDay.iDaysInMonth() // Days in Hijri month
    : firstDay.daysInMonth(); // Days in Gregorian month

  const startDayOfWeek = isHijri
    ? moment(firstDay).weekday() || 0
    : moment(firstDay).weekday() || 0;

  const allDays = Array(startDayOfWeek)
    .fill('')
    .concat(
      Array.from(
        { length: daysInMonth },
        (_, i) =>
          isHijri
            ? moment(firstDay)
                .iDate(i + 1)
                .format('iD') // Hijri day
            : moment(firstDay)
                .date(i + 1)
                .format('D') // Gregorian day
      )
    );

  const goToNextMonth = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDate((prev) =>
        isHijri ? moment(prev).add(1, 'iMonth') : moment(prev).add(1, 'month')
      );
      slideAnim.setValue(300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const goToPrevMonth = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDate((prev) =>
        isHijri
          ? moment(prev).subtract(1, 'iMonth')
          : moment(prev).subtract(1, 'month')
      );
      slideAnim.setValue(-300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const today = moment().format(isHijri ? 'iD' : 'D');

  const openModal = (day: string) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 16,
        padding: 40,
        borderRadius: 16,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <TouchableOpacity onPress={goToPrevMonth}>
          <Text style={{ color: 'white', fontSize: 20 }}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          {monthName}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={{ color: 'white', fontSize: 20 }}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        {daysOfWeek.map((day, i) => (
          <Text
            key={i}
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: '500',
              fontSize: 12,
            }}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          transform: [{ translateX: slideAnim }],
          justifyContent: 'space-between',
        }}
      >
        {allDays.map((day, index) => (
          <View
            key={index}
            style={{
              width: '13%',
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor:
                day === today
                  ? '#FFA000'
                  : day
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
              borderWidth: day ? 1 : 0,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: day === today ? 'white' : 'white',
                fontSize: 16,
                fontWeight: day === today ? 'bold' : 'normal',
              }}
              onPress={() => openModal(day)}
            >
              {day}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Modal for Holiday List */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white rounded-lg p-6 w-full max-w-md">
            <TouchableOpacity
              onPress={closeModal}
              className="absolute top-4 right-4 z-10"
            >
              <Text style={{ fontSize: 18, color: 'red' }}>Close</Text>
            </TouchableOpacity>
            <HolidayList
              selectedDay={selectedDay}
              selectedMonth={
                isHijri
                  ? currentDate.format('iMMMM')
                  : currentDate.format('MMMM')
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;
