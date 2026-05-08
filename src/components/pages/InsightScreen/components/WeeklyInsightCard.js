import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const WeeklyInsightCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.washOverlay} />
      
      <View style={styles.badgeRow}>
        <Ionicons name="sparkbubbles" size={16} color={Colors.primary} />
        <CustomText variant="label-sm" weight="bold" color={Colors.primary} style={styles.badgeText}>
          WEEKLY INSIGHT
        </CustomText>
      </View>
      
      <CustomText variant="headline" weight="bold" style={styles.mainText}>
        Your child enjoys creative activities the most this week 🎨
      </CustomText>
      
      <View style={styles.chartRow}>
        <View style={styles.barsContainer}>
          <View style={[styles.bar, { height: 12, backgroundColor: '#D1FAE5' }]} />
          <View style={[styles.bar, { height: 18, backgroundColor: '#A7F3D0' }]} />
          <View style={[styles.bar, { height: 26, backgroundColor: '#0F766E' }]} />
          <View style={[styles.bar, { height: 36, backgroundColor: '#059669' }]} />
        </View>
        <CustomText variant="label-sm" color={Colors.text.secondary}>Trending +12%</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 24,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
    marginBottom: 32,
    overflow: 'hidden', 
  },
  washOverlay: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0FDF4', 
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeText: {
    marginLeft: 6,
    letterSpacing: 1,
  },
  mainText: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 24,
    marginRight: 16,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    marginRight: 6,
  },
});

export default WeeklyInsightCard;
