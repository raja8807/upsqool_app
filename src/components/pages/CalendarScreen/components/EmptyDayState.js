import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const EmptyDayState = ({ selectedDayName, selectedMonthName, selectedDayNum, onAddActivity }) => {
  return (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconCircle}>
          <Ionicons name="calendar-outline" size={32} color={Colors.primary} />
      </View>
      <CustomText variant="headline" weight="bold" style={styles.emptyTitle}>No Activities</CustomText>
      <CustomText variant="body" color={Colors.text.secondary} align="center" style={styles.emptySubtitle}>
        You haven't logged any growth milestones for {selectedDayName}, {selectedMonthName} {selectedDayNum}.
      </CustomText>
      <TouchableOpacity 
        style={styles.emptyCtaBtn}
        onPress={onAddActivity}
      >
          <CustomText variant="body-lg" weight="bold" color={Colors.white}>Add Activity</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 24,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 16,
    elevation: 2,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0FDF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyCtaBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 20,
  },
});

export default EmptyDayState;
