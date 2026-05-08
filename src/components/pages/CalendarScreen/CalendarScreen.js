import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../styles/colors';
import { useDataContext } from '../../../context/DataContext';

import MonthNavigator from './components/MonthNavigator';
import CalendarGrid from './components/CalendarGrid';
import ActivityFeed from './components/ActivityFeed';
import AddActivityFAB from '../../UI/FAB/AddActivityFAB';

const CalendarScreenPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { activities } = useDataContext();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const getActivitiesForDateLocal = (dateObj) => {
    if (!dateObj) return [];
    return activities.filter(a => {
      const d = new Date(a.date);
      return d.getFullYear() === dateObj.getFullYear() &&
             d.getMonth() === dateObj.getMonth() &&
             d.getDate() === dateObj.getDate();
    });
  };

  const generateDotsLocal = (rawD, isSelected) => {
    const acts = getActivitiesForDateLocal(rawD);
    if (acts.length === 0) return null;
    if (isSelected) {
      return Array(Math.min(acts.length, 3)).fill('#FFF');
    }
    return acts.map(a => a.primaryColor).slice(0, 3);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const yearName = currentDate.getFullYear();

  const selectedDayName = selectedDate.toLocaleString('default', { weekday: 'long' });
  const selectedMonthName = selectedDate.toLocaleString('default', { month: 'long' });
  const selectedDayNum = selectedDate.getDate();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    const rawD = new Date(year, month - 1, prevMonthDays - firstDay + i + 1);
    const isSelected = rawD.toDateString() === selectedDate.toDateString();
    calendarDays.push({
      day: rawD.getDate(),
      gray: true,
      selected: isSelected,
      dots: generateDotsLocal(rawD, isSelected),
      rawDate: rawD
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const rawD = new Date(year, month, i);
    const isSelected = rawD.toDateString() === selectedDate.toDateString();
    calendarDays.push({
      day: i,
      gray: false,
      selected: isSelected,
      dots: generateDotsLocal(rawD, isSelected),
      rawDate: rawD
    });
  }

  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  const remaining = totalCells - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    const rawD = new Date(year, month + 1, i);
    const isSelected = rawD.toDateString() === selectedDate.toDateString();
    calendarDays.push({
      day: i,
      gray: true,
      selected: isSelected,
      dots: generateDotsLocal(rawD, isSelected),
      rawDate: rawD
    });
  }

  const handleDaySelect = (dayObj) => {
    setSelectedDate(dayObj.rawDate);
    if (dayObj.gray) {
      setCurrentDate(new Date(dayObj.rawDate.getFullYear(), dayObj.rawDate.getMonth(), 1));
    }
  };

  const selectedIndex = calendarDays.findIndex(d => d.selected);
  const weekStartIndex = selectedIndex !== -1 ? Math.floor(selectedIndex / 7) * 7 : 0;
  
  const displayedDays = isExpanded ? calendarDays : calendarDays.slice(weekStartIndex, weekStartIndex + 7);

  const activeActivities = getActivitiesForDateLocal(selectedDate);

  return (
    <View style={[styles.container, { paddingTop: 20 }]}>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        <MonthNavigator 
          monthName={monthName}
          yearName={yearName}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        <CalendarGrid 
          displayedDays={displayedDays}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          onDaySelect={handleDaySelect}
        />

        <ActivityFeed 
          activeActivities={activeActivities}
          selectedDayName={selectedDayName}
          selectedMonthName={selectedMonthName}
          selectedDayNum={selectedDayNum}
          onAddActivity={() => navigation?.navigate('AddActivityScreen')}
        />

      </ScrollView>

      <AddActivityFAB />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface, 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 100, 
  }
});

export default CalendarScreenPage;
