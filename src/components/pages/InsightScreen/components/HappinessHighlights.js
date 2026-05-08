import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const HappinessHighlights = () => {
  return (
    <View style={styles.container}>
      <CustomText variant="label-sm" weight="bold" style={styles.sectionTitle}>
        HAPPINESS HIGHLIGHTS
      </CustomText>

      {/* Top Activities Container */}
      <View style={styles.topActivitiesWrapper}>
        <View style={styles.topActivitiesHeader}>
          <CustomText variant="body-lg" weight="bold">Top Activities</CustomText>
          <Ionicons name="trending-up" size={20} color="#059669" />
        </View>

        {/* Item 1 */}
        <View style={styles.activityItemCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="pencil" size={16} color="#0F766E" />
            </View>
            <CustomText variant="body" weight="bold">Drawing</CustomText>
          </View>
          <CustomText variant="label-sm" weight="bold">4.8 ⭐️</CustomText>
        </View>

        {/* Item 2 */}
        <View style={styles.activityItemCard}>
          <View style={styles.activityLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#CCFBF1' }]}>
              <Ionicons name="football" size={16} color="#0F766E" />
            </View>
            <CustomText variant="body" weight="bold">Football</CustomText>
          </View>
          <CustomText variant="label-sm" weight="bold">4.6 ⭐️</CustomText>
        </View>
      </View>

      {/* Needs Attention Container */}
      <View style={styles.needsAttentionWrapper}>
        <View style={styles.attentionLeftStrip} />

        <View style={styles.attentionContent}>
          <View style={styles.attentionHeader}>
            <View>
              <CustomText variant="body" weight="bold" color="#9A3412">Needs Attention</CustomText>
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginTop: 4, fontSize: 10 }}>
                Suggested for encouragement
              </CustomText>
            </View>
            <View style={[styles.iconLargeCircle, { backgroundColor: '#FFEDD5' }]}>
              <Ionicons name="bulb" size={20} color="#9A3412" />
            </View>
          </View>

          <View style={[styles.activityItemCard, { marginBottom: 0, marginTop: 16 }]}>
            <View style={styles.activityLeft}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFEDD5' }]}>
                <Ionicons name="book" size={16} color="#9A3412" />
              </View>
              <CustomText variant="body" weight="bold">Reading</CustomText>
            </View>
            <View style={styles.lowScoreRight}>
              <CustomText variant="body" weight="bold" color="#DC2626">2.9</CustomText>
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ fontSize: 8, marginTop: 2, fontWeight: 'bold' }}>LOW ENGAGEMENT</CustomText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  sectionTitle: {
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 8,
  },
  topActivitiesWrapper: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  topActivitiesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  activityItemCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconLargeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  needsAttentionWrapper: {
    backgroundColor: '#FFF7ED', // light orange
    borderRadius: 16,

    flexDirection: 'row',
    overflow: 'hidden',
  },
  attentionLeftStrip: {
    width: 6,
    backgroundColor: '#F97316',
  },
  attentionContent: {
    flex: 1,
    padding: 20,
  },
  attentionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lowScoreRight: {
    alignItems: 'flex-end',
  },
});

export default HappinessHighlights;
