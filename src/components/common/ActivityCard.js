import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../UI/Text/Text';
import { Colors } from '../../styles/colors';
import ActivityRatingModal from '../UI/Modal/ActivityRatingModal';
import { useDataContext } from '../../context/DataContext';

const ActivityCard = ({ activity, hasConnector = false }) => {
  const { updateRating } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);

  const activityDate = activity.date instanceof Date ? activity.date : new Date(activity.date);
  const isPast = activityDate <= new Date();

  const handleCardPress = () => {
    if (isPast) {
      setModalVisible(true);
    }
  };

  const formattedTime = activityDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = activityDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
  // const isToday = activityDate.toDateString() === new Date().toDateString();
  const isToday = activityDate.toDateString() === new Date().toDateString();

  const baseColor = activity.primary_color || activity.primaryColor || Colors.primary;
  const bgColor = activity.icon_color || activity.iconColor || (baseColor + '15');

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={isPast ? 0.7 : 0.9}
        onPress={handleCardPress}
        style={styles.activityCardWrapper}
      >
        <View style={[styles.activityIconCircle, { backgroundColor: bgColor }]}>
          <Ionicons name={activity.icon_name || activity.iconName || 'sparkles'} size={24} color={baseColor} />
        </View>

        <View style={styles.activityDetails}>
          <CustomText variant="body-lg" weight="bold" style={styles.activityTitle}>{activity.title}</CustomText>
          <View style={styles.metadataRow}>
            <View style={styles.timeWrapper}>
              <Ionicons name="time-outline" size={14} color={Colors.text.secondary} />
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginLeft: 4 }}>
                {formattedTime}
              </CustomText>
            </View>

            <View style={styles.dateWrapper}>
              <Ionicons name="calendar-outline" size={14} color={Colors.text.secondary} />
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginLeft: 4 }}>
                {isToday ? "Today" : formattedDate}
              </CustomText>
            </View>

            {isPast && activity.duration && (
              <View style={styles.durationWrapper}>
                <Ionicons name="hourglass-outline" size={12} color={Colors.text.secondary} />
                <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginLeft: 4 }}>
                  {activity.duration}
                </CustomText>
              </View>
            )}

            {/* {activity.tags && activity.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {activity.tags.slice(0, 2).map((t, idx) => (
                  <View key={idx} style={[styles.tagBadge, { backgroundColor: baseColor + '10' }]}>
                    <CustomText variant="label-xs" weight="regular" color={baseColor}>{t}</CustomText>
                  </View>
                ))}
              </View>
            )} */}
          </View>
        </View>

        <View style={styles.rightAction}>
          {isPast ? (
            activity.score ? (
              <View style={styles.scoreBadge}>
                <Ionicons name="star" size={12} color="#A16207" />
                <CustomText variant="label-sm" weight="bold" style={{ marginLeft: 4, color: '#A16207' }}>
                  {activity.score}
                </CustomText>
              </View>
            ) : (
              <View style={styles.rateBtn}>
                <CustomText variant="label-xs" weight="bold" color={Colors.primary}>RATE</CustomText>
                <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
              </View>
            )
          ) : (
            <Ionicons name="chevron-forward" size={20} color={Colors.surface_container_high || "#E2E8F0"} />
          )}
        </View>
      </TouchableOpacity>

      {hasConnector && (
        <View style={styles.connectorWrapper}>
          <View style={[styles.connectorLine, { backgroundColor: baseColor + '20' }]} />
        </View>
      )}

      <ActivityRatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        activityTitle={activity.title}
        onSave={async (data) => {
          const score = data.stars ? (data.stars * 2).toFixed(1) : "5.0";
          await updateRating(activity.id, score);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  activityCardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
    zIndex: 2,
  },
  activityIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    marginBottom: 8,
    color: Colors.text.primary,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  rightAction: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 8,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEF08A',
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 2,
  },
  connectorWrapper: {
    height: 12,
    marginLeft: 40,
    zIndex: 1,
  },
  connectorLine: {
    width: 2,
    height: '100%',
  }
});

export default ActivityCard;


