import React from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@components/UI/Text/Text";
import CustomInput from "@components/UI/Input/Input";
import CustomSelect from "@components/UI/Select/Select";
import { Colors } from "@styles/colors";

const FREQUENCIES = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];

const DAYS = [
  { label: "S", value: "Sun" },
  { label: "M", value: "Mon" },
  { label: "T", value: "Tue" },
  { label: "W", value: "Wed" },
  { label: "T", value: "Thu" },
  { label: "F", value: "Fri" },
  { label: "S", value: "Sat" },
];

const AddHabit = ({ values, setValues, habitDays, setHabitDays }) => {
  const toggleDay = (day) => {
    if (habitDays.includes(day)) {
      setHabitDays((prev) => prev.filter((item) => item !== day));
    } else {
      setHabitDays((prev) => [...prev, day]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CustomInput
          label="Habit Name"
          icon="videocam-outline"
          placeholder="e.g. Painting, Piano"
          value={values.habit}
          onChangeText={(v) =>
            setValues((prev) => ({
              ...prev,
              habit: v,
            }))
          }
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.section, { flex: 1 }]}>
          <CustomInput
            label="Preferred Time"
            icon="time-outline"
            placeholder="08:00 AM"
            value={values.habitTime}
            onChangeText={(v) =>
              setValues((prev) => ({
                ...prev,
                habitTime: v,
              }))
            }
          />
        </View>
      </View>

      <View style={styles.section}>
        <CustomText
          variant="label-sm"
          color={Colors.text.secondary}
          style={styles.sectionLabel}
        >
          Repeat Days
        </CustomText>
        <View style={styles.daysRow}>
          {DAYS.map((d) => {
            const active = habitDays.includes(d.value);
            return (
              <TouchableOpacity
                key={d.value}
                style={[styles.day, active && styles.dayActive]}
                onPress={() => toggleDay(d.value)}
              >
                <CustomText
                  variant="label-sm"
                  weight="bold"
                  color={active ? Colors.white : Colors.text.primary}
                >
                  {d.label}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.toggleRow}>
          <View style={styles.remindLeft}>
            <View style={styles.goalIcon}>
              <Ionicons name="trophy-outline" size={20} color="#F59E0B" />
            </View>
            <View>
              <CustomText variant="body" weight="bold">Set Goal</CustomText>
              <CustomText variant="label-sm" color={Colors.text.secondary}>Target days to master this habit</CustomText>
            </View>
          </View>
          <Switch
            value={values.isGoalSet}
            onValueChange={(v) => setValues(prev => ({ ...prev, isGoalSet: v }))}
            trackColor={{ false: "#E2E8F0", true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>

        {values.isGoalSet && (
          <View style={styles.goalInputWrapper}>
            <CustomInput
              label="No. of Days"
              icon="calendar-outline"
              placeholder="e.g. 21"
              keyboardType="numeric"
              value={values.goalDaysCount}
              onChangeText={(v) =>
                setValues((prev) => ({
                  ...prev,
                  goalDaysCount: v,
                }))
              }
            />
            <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginTop: 8, marginLeft: 4 }}>
              Common goals are 21, 30 or 60 days.
            </CustomText>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.remindRow}>
          <View style={styles.remindLeft}>
            <View style={styles.remindIcon}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
            </View>
            <View>
              <CustomText variant="body" weight="bold">Remind Me</CustomText>
              <CustomText variant="label-sm" color={Colors.text.secondary}>Send notification before start</CustomText>
            </View>
          </View>
          <Switch
            value={values.remindMe}
            onValueChange={(v) => setValues(prev => ({ ...prev, remindMe: v }))}
            trackColor={{ false: "#E2E8F0", true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <CustomInput
          label="Description (Optional)"
          placeholder="Briefly describe the habit..."
          value={values.habitDescription}
          onChangeText={(v) =>
            setValues((prev) => ({
              ...prev,
              habitDescription: v,
            }))
          }
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

export default AddHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionLabel: {
    marginBottom: 14,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface_container_low,
  },
  dayActive: {
    backgroundColor: Colors.primary,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface_container_low,
    padding: 16,
    borderRadius: 20,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  goalInputWrapper: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  remindRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface_container_low,
    padding: 16,
    borderRadius: 20,
  },
  remindLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  remindIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  }
});
