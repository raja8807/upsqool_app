import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CustomText from "../../UI/Text/Text";
import CustomTab from "@components/UI/Tab/Tab";

import { Colors } from "../../../styles/colors";
import { useDataContext } from "../../../context/DataContext";
import { useGetAllActivities } from "@services/activityService";

import HeroSection from "./components/HeroSection";
import AddActivity from "./tabs/AddActivity/AddActivity";
import AddHabit from "./tabs/AddHabit/AddHabit";

const TABS = [
  {
    key: "activity",
    label: "Activity",
    icon: "musical-notes-outline",
  },
  {
    key: "habit",
    label: "Habit",
    icon: "videocam-outline",
  },
];

const AddActivityScreenPage = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { addActivity } = useDataContext();
  const { responseData } = useGetAllActivities();

  const allActivities = responseData?.data || [];

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("activity");

  const [values, setValues] = useState({
    activity: null,
    customActivity: "",
    duration: "30 min",
    habit: "",
    habitDescription: "",
    habitTime: "08:00 AM",
    habitFrequency: "Daily",
    remindMe: false,
    isGoalSet: false,
    goalDaysCount: "21",
  });

  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [selectedDays, setSelectedDays] = useState(["Mon", "Wed"]);
  const [habitDays, setHabitDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [selectedQs, setSelectedQs] = useState(["Intelligence"]);

  const selectedActivity = useMemo(() => {
    return allActivities.find((a) => a.title === values.activity);
  }, [values.activity, allActivities]);

  const toggleQ = (q) => {
    if (selectedQs.includes(q)) {
      setSelectedQs((prev) => prev.filter((item) => item !== q));
    } else {
      setSelectedQs((prev) => [...prev, q]);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((item) => item !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (activeTab === "activity") {
        const title =
          values.activity === "Other" ? values.customActivity : values.activity;

        if (!title) {
          alert("Please select an activity");
          return;
        }

        await addActivity({
          title,
          global_activity_id: selectedActivity?.id,
          duration: values.duration,
          qs: selectedQs,
          repeatWeekly,
          repeatDays: selectedDays,
          icon_name: selectedActivity?.icon || "sparkles",
          icon_color: selectedActivity?.icon_color,
          primary_color: selectedActivity?.primary_color,
        });
      } else {
        // Handle Habit Save (Placeholder)
        if (!values.habit) {
          alert("Please enter a habit name");
          return;
        }
        console.log("Saving habit:", values.habit, values.habitDescription);
        
        // For now, save habit as an activity with a specific tag
        await addActivity({
          title: values.habit,
          description: values.habitDescription,
          tags: ["Habit"],
          duration: values.habitFrequency, // Or use duration if it fits
          time: values.habitTime,
          repeatFrequency: values.habitFrequency,
          repeatDays: habitDays,
          remindMe: values.remindMe,
          isGoalSet: values.isGoalSet,
          goalDaysCount: values.goalDaysCount,
          qs: selectedQs,
          icon_name: "videocam", 
        });
      }

      navigation.goBack();
    } catch (e) {
      alert("Failed to save " + activeTab);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomText variant="body" weight="bold" color={Colors.primary}>
            Cancel
          </CustomText>
        </TouchableOpacity>

        <CustomText variant="body-lg" weight="bold">
          Add Entry
        </CustomText>

        <TouchableOpacity onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <CustomText variant="body" weight="bold" color={Colors.primary}>
              Save
            </CustomText>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HeroSection />

        <CustomTab 
          tabs={TABS} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />

        {activeTab === "activity" ? (
          <AddActivity
            allActivities={allActivities}
            values={values}
            setValues={setValues}
            selectedActivity={selectedActivity}
            repeatWeekly={repeatWeekly}
            setRepeatWeekly={setRepeatWeekly}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
            selectedQs={selectedQs}
            toggleQ={toggleQ}
          />
        ) : (
          <AddHabit 
            values={values} 
            setValues={setValues} 
            habitDays={habitDays}
            setHabitDays={setHabitDays}
          />
        )}

        {/* SAVE */}

        <TouchableOpacity 
          style={[styles.saveBtn, loading && { opacity: 0.7 }]} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
              <CustomText variant="body-lg" weight="bold" color={Colors.white}>
                Save {activeTab === "activity" ? "Activity" : "Habit"}
              </CustomText>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddActivityScreenPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  header: {
    height: 64,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // Removed 1px solid border to follow 'The No-Line Rule'
    backgroundColor: Colors.white,
    
    // Using soft shadow instead of border for tonal contrast
    shadowColor: Colors.on_surface || "#191C1D",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 3,
    zIndex: 10,
  },

  content: {
    padding: 24,
    paddingBottom: 60,
  },

  saveBtn: {
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
});
