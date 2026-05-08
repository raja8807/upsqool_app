import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const MonthNavigator = ({ monthName, yearName, onPrev, onNext }) => {
  return (
    <View>
      <View style={styles.monthNavRow}>
        <CustomText variant="display-md" weight="bold">{monthName} {yearName}</CustomText>
        <View style={styles.navBtnGroup}>
          <TouchableOpacity style={styles.navBtn} onPress={onPrev}>
            <Ionicons name="chevron-back" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={onNext}>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <CustomText variant="body-lg" color={Colors.text.secondary} style={styles.monthSubtitle}>
        Tracking 12 growth milestones this month
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  monthNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtnGroup: {
    flexDirection: 'row',
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface_container_lowest,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  monthSubtitle: {
    marginTop: 8,
    marginBottom: 32,
  },
});

export default MonthNavigator;
