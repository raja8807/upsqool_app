import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../../../../UI/Text/Text';
import { Colors } from '../../../../../styles/colors';
import ActivityCard from '../../../../common/ActivityCard';

const TodayActivities = ({ activities = [] }) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const todayActivities = activities.filter((a) => {
    const d = new Date(a.date);
    return d >= startOfToday && d <= endOfToday;
  });

  if (todayActivities.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText variant="headline" weight="bold">Today's Activities</CustomText>
        <TouchableOpacity>
          <CustomText variant="label" weight="bold" color={Colors.primary}>VIEW ALL</CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {todayActivities.map((activity, idx) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
            hasConnector={idx !== todayActivities.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  list: {
    gap: 0, // ActivityCard handles its own internal spacing/connector
  },
});

export default TodayActivities;
