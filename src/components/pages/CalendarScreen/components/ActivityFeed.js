import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';
import ActivityCard from '../../../common/ActivityCard';
import EmptyDayState from './EmptyDayState';

const ActivityFeed = ({ activeActivities, selectedDayName, selectedMonthName, selectedDayNum, onAddActivity }) => {
  return (
    <View>
      <View style={styles.agendaHeader}>
        <CustomText variant="headline" weight="bold" style={styles.agendaDateTitle}>
          {selectedDayName}, {selectedMonthName} {selectedDayNum}
        </CustomText>
        <View style={styles.agendaChip}>
          <CustomText variant="label-sm" color={Colors.primary} weight="bold">
            {activeActivities.length} {activeActivities.length === 1 ? 'Activity' : 'Activities'}
          </CustomText>
        </View>
      </View>

      {activeActivities.length > 0 ? (
        <View style={styles.feedWrapper}>
          {activeActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
      ) : (
        <EmptyDayState 
          selectedDayName={selectedDayName}
          selectedMonthName={selectedMonthName}
          selectedDayNum={selectedDayNum}
          onAddActivity={onAddActivity}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  agendaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  agendaDateTitle: {
    flex: 1,
  },
  agendaChip: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  feedWrapper: {
    flexDirection: 'column',
  },
});

export default ActivityFeed;
