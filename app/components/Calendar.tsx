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
import { useCalendar } from '../context/CalendarContext';
import HolidayList from './HolidayList'; // Import HolidayList component

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const { useHijri } = useCalendar();
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // Track selected day
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation value

  const isHijri = useHijri;
  const monthName = isHijri
    ? currentDate.format('iMMMM iYYYY')
    : currentDate.format('MMMM YYYY');

  const firstDay = isHijri
    ? moment(currentDate).startOf('iMonth')
    : moment(currentDate).startOf('month');

  const daysInMonth = isHijri
    ? firstDay.iDaysInMonth()
    : firstDay.daysInMonth();

  const startDayOfWeek = isHijri
    ? moment(firstDay).weekday() || 0
    : moment(firstDay).weekday() || 0;

  const allDays = Array(startDayOfWeek)
    .fill('')
    .concat(
      Array.from({ length: daysInMonth }, (_, i) =>
        isHijri
          ? moment(firstDay)
              .iDate(i + 1)
              .format('iD')
          : moment(firstDay)
              .date(i + 1)
              .format('D')
      )
    );

  const goToNextMonth = () => {
    Animated.timing(slideAnim, {
      toValue: -300, // Slide left
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDate((prev) =>
        isHijri ? moment(prev).add(1, 'iMonth') : moment(prev).add(1, 'month')
      );
      slideAnim.setValue(300); // Reset position
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
      toValue: 300, // Slide right
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setCurrentDate((prev) =>
        isHijri
          ? moment(prev).subtract(1, 'iMonth')
          : moment(prev).subtract(1, 'month')
      );
      slideAnim.setValue(-300); // Reset position
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
    setSelectedDay(day); // Set the selected day
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedDay(null); // Reset the selected day
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

      {/* Calendar Grid with Animation */}
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          transform: [{ translateX: slideAnim }],
          justifyContent: 'space-between', // Ensure proper spacing
        }}
      >
        {allDays.map((day, index) => (
          <View
            key={index}
            style={{
              width: '13%', // Ensure 7 columns fit in the row
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor:
                day === today
                  ? '#FFA000' // Highlight current day
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
              onPress={() => openModal(day)} // Open modal on day press
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
            />{' '}
            {/* Render HolidayList */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Calendar;
