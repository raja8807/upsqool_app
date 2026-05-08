import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const CurrentOverview = ({ totalTime, vsYesterdayValue, progressPercentage, dailyGoal }) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primary_container]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.statsCard}
    >
      <View style={styles.overviewHeader}>
        <CustomText variant="label-sm" weight="bold" color="rgba(255,255,255,0.7)" style={{ letterSpacing: 1.2 }}>CURRENT OVERVIEW</CustomText>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <CustomText variant="label-sm" weight="bold" color={Colors.primary}>LIVE</CustomText>
        </View>
      </View>

      <CustomText variant="headline" weight="bold" color={Colors.white} style={styles.todaySummaryTitle}>Today's Summary</CustomText>

      <View style={styles.statsMainRow}>
        <View>
          <CustomText variant="display-lg" weight="bold" color={Colors.white}>{totalTime}</CustomText>
          <CustomText variant="body-sm" color="rgba(255,255,255,0.8)" style={{ marginTop: -4 }}>Total time spent today</CustomText>
        </View>
        <View style={styles.vsYesterday}>
          <View style={styles.trendBadge}>
            <Ionicons name="trending-up" size={14} color="#FFF5EB" />
            <CustomText variant="body" weight="bold" color="#FFF5EB" style={{ marginLeft: 4 }}>{vsYesterdayValue}</CustomText>
          </View>
          <CustomText variant="label-sm" color="rgba(255,255,255,0.7)" align="right" style={{ marginTop: 4 }}>VS YESTERDAY</CustomText>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: progressPercentage }]} />
        </View>
        <View style={styles.progressLabels}>
          <CustomText variant="label-sm" color="rgba(255,255,255,0.8)">{progressPercentage} complete</CustomText>
          <CustomText variant="label-sm" color="rgba(255,255,255,0.8)">Goal: {dailyGoal}</CustomText>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    marginHorizontal: 20,
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  todaySummaryTitle: {
    marginBottom: 20,
  },
  statsMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  vsYesterday: {
    alignItems: 'flex-end',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 5,
    width: '100%',
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CurrentOverview;
