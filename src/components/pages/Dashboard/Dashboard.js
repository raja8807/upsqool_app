import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../styles/colors";
import { useDataContext } from "../../../context/DataContext";
import { useAuth } from "../../../context/AuthContext";

import DashboardHeader from "./components/DashboardHeader";
import ChildSelectorModal from "../../UI/Modal/ChildSelectorModal";
import GoalBanner from "./components/GoalBanner/GoalBanner";
import CurrentOverview from "./components/CurrentOverview";
import TodayHabits from "./components/TodayHabits/TodayHabits";
import TodayActivities from "./components/TodayActivities/TodayActivities";
import QDistributionSummary from "./components/QDistributionSummary";
import RecentActivitiesFeed from "./components/RecentActivitiesFeed";
import UpcomingActivitiesFeed from "./components/UpcomingActivitiesFeed";

import {
  calculateTotalTimeToday,
  calculateProgressPercentage,
  calculateQDistribution,
} from "../../../utils/dataCalculations";

const DashboardScreenPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showChildSelector, setShowChildSelector] = useState(false);
  const { activities } = useDataContext();
  const { childProfile, startNewChildOnboarding } = useAuth();

  // console.log(childProfile);

  const now = new Date();

  const recent = activities
    .filter((a) => new Date(a.date) <= now)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  const upcoming = activities
    .filter((a) => new Date(a.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const displayedUpcoming = showAllUpcoming ? upcoming : upcoming.slice(0, 2);

  // Dynamic Stats
  const totalTime = calculateTotalTimeToday(activities);
  const progressPercentage = calculateProgressPercentage(
    activities,
    childProfile?.hours || 2,
  );
  const qDistribution = calculateQDistribution(activities);
  const dailyGoal = `${childProfile?.hours || 2}h 00m`;

  const handleAddChild = async () => {
    setShowChildSelector(false);
    await startNewChildOnboarding();
    navigation.navigate("ChildrenOnBoarding");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, paddingTop: insets.top }}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          childName={childProfile?.first_name}
          avatarUrl={childProfile?.avatar_url}
          navigateToSettings={() => navigation?.navigate("Setting")}
          onSwitchChildPress={() => setShowChildSelector(true)}
        />


        <CurrentOverview
          totalTime={totalTime}
          vsYesterdayValue="+12%" // Still mocked for now as we don't have enough data history
          progressPercentage={progressPercentage}
          dailyGoal={dailyGoal}
        />

        <GoalBanner childName={childProfile?.first_name} />


        <TodayHabits />

        <TodayActivities activities={activities} />

        <QDistributionSummary data={qDistribution} />

        <RecentActivitiesFeed activities={recent} />

        <UpcomingActivitiesFeed
          displayedUpcoming={displayedUpcoming}
          showAllUpcoming={showAllUpcoming}
          onToggleShowMore={() => setShowAllUpcoming(!showAllUpcoming)}
        />
      </ScrollView>

      <ChildSelectorModal
        visible={showChildSelector}
        onClose={() => setShowChildSelector(false)}
        onAddChild={handleAddChild}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default DashboardScreenPage;
