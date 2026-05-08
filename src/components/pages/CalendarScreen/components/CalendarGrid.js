import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const calendarHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CalendarGrid = ({ displayedDays, isExpanded, onToggleExpand, onDaySelect }) => {
  return (
    <View style={styles.calendarCard}>
      <View style={styles.calGrid}>
        {calendarHeaders.map((h, i) => (
          <CustomText key={i} variant="label-sm" weight="bold" color={Colors.text.primary} style={styles.calHeaderCell}>
            {h}
          </CustomText>
        ))}
      </View>

      <View style={styles.calGridMatrix}>
        {displayedDays.map((dayObj, index) => (
          <TouchableOpacity key={index} style={styles.calDayCell} onPress={() => onDaySelect(dayObj)}>
            <View style={[styles.dayCircle, dayObj.selected && styles.dayCircleSelected]}>
              <CustomText
                variant="body-lg"
                weight="bold"
                color={dayObj.gray ? Colors.text.light : (dayObj.selected ? Colors.white : Colors.text.primary)}
              >
                {dayObj.day}
              </CustomText>

              {dayObj.dots && (
                <View style={styles.dotRow}>
                  {dayObj.dots.map((dotColor, i) => (
                    <View key={i} style={[styles.dot, { backgroundColor: dotColor, marginLeft: i > 0 ? 2 : 0 }]} />
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.pillHandleWrapper} onPress={onToggleExpand}>

        <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color={Colors.outline_variant} style={{ marginTop: 4 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarCard: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 4,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
    marginBottom: 40,
  },
  calGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  calHeaderCell: {
    width: '14.28%',
    textAlign: 'center',
  },
  calGridMatrix: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calDayCell: {
    width: '14.28%',
    aspectRatio: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: Colors.primary,
  },
  dotRow: {
    flexDirection: 'row',
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  pillHandleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },
  pillHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.outline_variant,
  },
});

export default CalendarGrid;
