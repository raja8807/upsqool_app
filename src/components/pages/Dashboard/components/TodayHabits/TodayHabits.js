import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../../UI/Text/Text';
import { Colors } from '../../../../../styles/colors';

const TodayHabits = () => {
  const [habits, setHabits] = useState([
    {
      id: 'h1',
      title: 'Reading',
      icon: 'book-outline',
      color: '#6366F1',
      completed: false,
      currentDays: 4,
      targetDays: 10,
    },
    {
      id: 'h2',
      title: 'Hydration',
      icon: 'water-outline',
      color: '#0EA5E9',
      completed: true,
      currentDays: 8,
      targetDays: 12,
    },
    {
      id: 'h3',
      title: 'Yoga',
      icon: 'fitness-outline',
      color: '#10B981',
      completed: false,
      currentDays: 2,
      targetDays: 7,
    },
    {
      id: 'h4',
      title: 'Meditation',
      icon: 'leaf-outline',
      color: '#8B5CF6',
      completed: false,
      currentDays: 15,
      targetDays: 21,
    },
  ]);

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const newCompleted = !h.completed;
        return {
          ...h,
          completed: newCompleted,
          currentDays: newCompleted ? h.currentDays + 1 : h.currentDays - 1,
        };
      }
      return h;
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText variant="headline" weight="bold">Today's Habits</CustomText>
        <TouchableOpacity>
          <CustomText variant="label" weight="bold" color={Colors.primary}>VIEW ALL</CustomText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {habits.map((habit) => (
          <TouchableOpacity
            key={habit.id}
            style={[
              styles.habitCard,
              habit.completed && { borderColor: habit.color + '40', }
            ]}
            onPress={() => toggleHabit(habit.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.statusIndicator, { backgroundColor: habit.completed ? habit.color : '#F1F5F9' }]}>
              {habit.completed && <Ionicons name="checkmark" size={12} color={Colors.white} />}
            </View>

            <View style={[styles.iconBox, { backgroundColor: habit.color + '15' }]}>
              <Ionicons name={habit.icon} size={24} color={habit.color} />
            </View>

            <View style={styles.content}>
              <CustomText variant="body-sm" weight="bold" numberOfLines={1}>{habit.title}</CustomText>
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginTop: 2 }}>
                {habit.currentDays}/{habit.targetDays} Days
              </CustomText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  habitCard: {
    width: 120,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  statusIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  content: {
    width: '100%',
  },
});

export default TodayHabits;
