import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../UI/Text/Text';
import { Colors } from '../../../styles/colors';

import InsightHeader from './components/InsightHeader';
import WeeklyInsightCard from './components/WeeklyInsightCard';
import QDistributionCard from './components/QDistributionCard';
import ChildDevelopmentChart from './components/ChildDevelopmentChart';
import HappinessHighlights from './components/HappinessHighlights';
import QuoteBanner from './components/QuoteBanner';

const InsightScreenPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>



      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <InsightHeader />
        {/* <WeeklyInsightCard /> */}
        <QDistributionCard />
        <ChildDevelopmentChart />
        <HappinessHighlights />
        <QuoteBanner />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  topAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarDummy: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
});

export default InsightScreenPage;
