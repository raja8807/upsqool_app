import React, { useState, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../UI/Text/Text";
import CustomTabs from "../../UI/Tab/Tab";
import { Colors } from "../../../styles/colors";
import ActivityCard from "../../common/ActivityCard";
import { useDataContext } from "../../../context/DataContext";
import AddActivityFAB from "../../UI/FAB/AddActivityFAB";

const CATEGORY_TABS = [
  { key: "activities", label: "Activities", icon: "flash-outline" },
  { key: "habits", label: "Habits", icon: "calendar-outline" },
];

const ActivitiesScreenPage = () => {
  const insets = useSafeAreaInsets();
  const { activities } = useDataContext();
  const [activeCategory, setActiveCategory] = useState("activities");
  const [activeFilter, setActiveFilter] = useState("Today");

  const FILTERS = ["Past", "Today", "Upcoming"];

  // State for mock habits to allow completion toggle
  const [habits, setHabits] = useState([
    {
      id: "h1",
      title: "Reading",
      iconName: "book-outline",
      primaryColor: "#6366F1",
      currentDays: 4,
      targetDays: 10,
      completed: false,
    },
    {
      id: "h2",
      title: "Hydration",
      iconName: "water-outline",
      primaryColor: "#0EA5E9",
      currentDays: 8,
      targetDays: 12,
      completed: true,
    },
    {
      id: "h3",
      title: "Yoga",
      iconName: "fitness-outline",
      primaryColor: "#10B981",
      currentDays: 2,
      targetDays: 7,
      completed: false,
    },
    {
      id: "h4",
      title: "Meditation",
      iconName: "leaf-outline",
      primaryColor: "#8B5CF6",
      currentDays: 15,
      targetDays: 21,
      completed: false,
    },
  ]);

  const toggleHabitCompletion = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Mock data as fallback if context is empty
  const mockActivities = [
    {
      id: "m1",
      title: "Morning Yoga",
      duration: "30 min",
      date: new Date(),
      iconName: "fitness-outline",
      primaryColor: "#006B58",
      iconColor: "#006B5815",
      tags: ["Intelligence", "Physical"],
      score: "8.5",
    },
    {
      id: "m2",
      title: "Story Telling",
      duration: "45 min",
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      iconName: "book-outline",
      primaryColor: "#FC8A40",
      iconColor: "#FC8A4015",
      tags: ["Creative", "Emotional"],
      score: null,
    },
    {
      id: "m3",
      title: "Math Puzzle",
      duration: "20 min",
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Yesterday
      iconName: "calculator-outline",
      primaryColor: "#1ABC9C",
      iconColor: "#1ABC9C15",
      tags: ["Intelligence"],
      score: "9.0",
    },
  ];

  const dataToUse = activities.length > 0 ? activities : mockActivities;

  const filteredActivities = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    return dataToUse.filter((a) => {
      const d = new Date(a.date);
      if (activeFilter === "Today") {
        return d >= startOfToday && d <= endOfToday;
      } else if (activeFilter === "Past") {
        return d < startOfToday;
      } else {
        return d > endOfToday;
      }
    });
  }, [activeFilter, dataToUse]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <CustomText variant="display-sm" weight="bold">
          {activeCategory === "activities" ? "Activities Log" : "Habit Tracker"}
        </CustomText>
        <TouchableOpacity style={styles.headerActionBtn}>
          <Ionicons name="search-outline" size={22} color={Colors.text.light} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabWrapper}>
        <CustomTabs
          tabs={CATEGORY_TABS}
          activeTab={activeCategory}
          onChange={setActiveCategory}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
            >
              <CustomText
                variant="body-sm"
                weight="bold"
                color={isActive ? Colors.white : Colors.text.secondary}
              >
                {f}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeCategory === "activities" ? (
          filteredActivities.length > 0 ? (
            filteredActivities.map((activity, idx) => (
              <View key={activity.id}>
                <ActivityCard
                  activity={activity}
                  hasConnector={idx !== filteredActivities.length - 1}
                />
                {idx !== filteredActivities.length - 1 && (
                  <View style={styles.spacer} />
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="flash-outline" size={64} color={Colors.surface_container} />
              <CustomText variant="body-lg" weight="bold" color={Colors.text.secondary} style={{ marginTop: 16 }}>
                No activities for {activeFilter.toLowerCase()}
              </CustomText>
            </View>
          )
        ) : (
          <View style={styles.habitsGrid}>
            {habits.map((habit) => (
              <TouchableOpacity
                key={habit.id}
                style={[
                  styles.habitCard,
                  habit.completed && { borderColor: habit.primaryColor + '40' }
                ]}
                onPress={() => toggleHabitCompletion(habit.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.statusIndicator, { backgroundColor: habit.completed ? habit.primaryColor : '#F1F5F9' }]}>
                  {habit.completed && <Ionicons name="checkmark" size={12} color={Colors.white} />}
                </View>

                <View style={[styles.iconBox, { backgroundColor: habit.primaryColor + '15' }]}>
                  <Ionicons name={habit.iconName} size={24} color={habit.primaryColor} />
                </View>

                <View style={styles.habitContent}>
                  <CustomText variant="body-sm" weight="bold" numberOfLines={1}>{habit.title}</CustomText>
                  <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginTop: 2 }}>
                    {habit.currentDays}/{habit.targetDays} Days
                  </CustomText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <AddActivityFAB />
    </View>
  );
};

export default ActivitiesScreenPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerActionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  tabWrapper: {
    paddingHorizontal: 20,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.outline_variant,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  spacer: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  habitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  habitCard: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 4,
  },
  statusIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.white,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  habitContent: {
    width: "100%",
  },
});
