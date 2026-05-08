import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';
import ActivityCard from '../../../common/ActivityCard';

const RecentActivitiesFeed = ({ activities }) => {
  return (
    <View style={styles.section}>
      <CustomText variant="headline" weight="bold" style={styles.sectionTitle}>Recent Activities</CustomText>
      <View style={styles.feedContainerNew}>
        {activities.map((activity) => (
          <View key={activity.id} style={{ marginBottom: 16 }}>
            <ActivityCard activity={activity} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  feedContainerNew: {
    paddingHorizontal: 20,
  },
});

export default RecentActivitiesFeed;
