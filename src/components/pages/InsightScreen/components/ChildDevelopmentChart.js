import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';
import { useDataContext } from '../../../../context/DataContext';
import { getWeeklyStats, getMonthlyStats, getLifetimeStats } from '../../../../utils/dataCalculations';

const ChildDevelopmentChart = () => {
  const { activities } = useDataContext();
  const [filter, setFilter] = useState('Weekly');

  const dynamicDatasets = useMemo(() => ({
    Weekly: getWeeklyStats(activities),
    Monthly: getMonthlyStats(activities),
    Lifetime: getLifetimeStats(activities).filter(s => s.value > 0).slice(-6) || getLifetimeStats(activities).slice(-6)
  }), [activities]);

  const currentData = dynamicDatasets[filter];

  // Mathematical bar height calculation
  const maxDataValue = Math.max(...currentData.map(d => d.value));

  // Chart max rendering height threshold (pixels)
  const maxBarHeight = 140;

  return (
    <View style={styles.container}>
      <CustomText variant="headline" weight="bold" style={styles.title}>Child Development</CustomText>
      <CustomText variant="body" color={Colors.text.secondary} style={styles.subtitle}>Average hours over tracked timeframes</CustomText>

      <View style={styles.cardWrapper}>
        <View style={styles.chartArea}>
          {currentData.map((item, idx) => {
            // Protect against 0 calculations safely
            const normalizedHeight = maxDataValue > 0 ? (item.value / maxDataValue) * maxBarHeight : 0;
            // Ensure minimum dot if 0
            const finalHeight = Math.max(normalizedHeight, 4);

            return (
              <View key={idx} style={styles.barCol}>
                <CustomText variant="label-sm" weight="bold" color={Colors.text.primary} style={styles.valueLabel}>
                  {item.value.toFixed(1)}
                </CustomText>

                <View style={[styles.bar, { height: finalHeight }]} />

                <View style={styles.xLabelContainer}>
                  <CustomText variant="label-sm" color={Colors.text.secondary} style={{ fontSize: 9 }}>
                    {item.label}
                  </CustomText>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.filterTabsWrapper}>
          {Object.keys(dynamicDatasets).map((tab) => {
            const isActive = filter === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setFilter(tab)}
                activeOpacity={0.8}
                style={[styles.tabBox, isActive && styles.tabBoxActive]}
              >
                <CustomText
                  variant="label-sm"
                  weight="bold"
                  color={isActive ? Colors.white : Colors.primary}
                >
                  {tab}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 4,
    marginLeft: 8,
  },
  subtitle: {
    marginBottom: 16,
    marginLeft: 8,
  },
  cardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,


  },
  chartArea: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.outline_variant,
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 0,
    marginBottom: 32, // space beneath for tabs
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '60%', // Dynamically scales to flex column width safely
    backgroundColor: '#14B8A6', // Using Primary Creative Teal
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  valueLabel: {
    fontSize: 10,
    marginBottom: 8,
  },
  xLabelContainer: {
    position: 'absolute',
    bottom: -24, // Push explicitly below the X axis border!
    alignItems: 'center',
    width: '100%',
  },
  filterTabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  tabBox: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#E6F4F1',
    alignItems: 'center',
  },
  tabBoxActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default ChildDevelopmentChart;
