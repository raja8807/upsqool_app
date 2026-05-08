import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';
import ActivityCard from '../../../common/ActivityCard';

const MOCK_UPCOMING = [
  {
    id: 'up1',
    title: 'Cognitive Puzzle',
    duration: '45 min',
    date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    icon_name: 'extension-puzzle-outline',
    primary_color: '#8B5CF6',
    tags: ['Intelligence', 'Problem Solving'],
  },
  {
    id: 'up2',
    title: 'Outdoor Play',
    duration: '1 hour',
    date: new Date(new Date().getTime() + 5 * 60 * 60 * 1000), // 5 hours from now
    icon_name: 'sunny-outline',
    primary_color: '#F59E0B',
    tags: ['Physical', 'Emotional'],
  },
  {
    id: 'up3',
    title: 'Reading Session',
    duration: '30 min',
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
    icon_name: 'book-outline',
    primary_color: '#0EA5E9',
    tags: ['Language', 'Intelligence'],
  }
];

const UpcomingActivitiesFeed = ({ displayedUpcoming = [], showAllUpcoming, onToggleShowMore }) => {
  const activitiesToDisplay = displayedUpcoming.length > 0 ? displayedUpcoming : MOCK_UPCOMING.slice(0, showAllUpcoming ? 3 : 2);

  return (
    <View style={styles.section}>
      <CustomText variant="headline" weight="bold" style={styles.sectionTitle}>Upcoming Activities</CustomText>
      <View style={styles.feedContainerOld}>
        {activitiesToDisplay.map((activity, index) => (
          <View key={activity.id} style={{ marginBottom: index < activitiesToDisplay.length - 1 ? 0 : 24 }}>
            <ActivityCard 
              activity={activity} 
              hasConnector={index < activitiesToDisplay.length - 1} 
            />
          </View>
        ))}

        <TouchableOpacity
          style={styles.showMoreBtn}
          onPress={onToggleShowMore}
        >
          <CustomText variant="body" weight="bold" color={Colors.primary} style={{ marginRight: 4 }}>
            {showAllUpcoming ? "Show Less" : "Show More"}
          </CustomText>
          <Ionicons name={showAllUpcoming ? "chevron-up" : "chevron-down"} size={16} color={Colors.primary} />
        </TouchableOpacity>
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
  feedContainerOld: {
    paddingHorizontal: 20,
  },
  showMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: Colors.surface_container_low,
  },
});

export default UpcomingActivitiesFeed;
