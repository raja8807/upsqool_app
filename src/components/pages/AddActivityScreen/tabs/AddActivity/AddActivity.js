import React from "react";
import { View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@components/UI/Text/Text";
import CustomInput from "@components/UI/Input/Input";
import CustomSelect from "@components/UI/Select/Select";
import { Colors } from "@styles/colors";
import { ALL_Qs } from "src/constants/constants";

const DURATIONS = ["15 min", "30 min", "45 min", "60 min"];

const DAYS = [
  { label: "S", value: "Sun" },
  { label: "M", value: "Mon" },
  { label: "T", value: "Tue" },
  { label: "W", value: "Wed" },
  { label: "T", value: "Thu" },
  { label: "F", value: "Fri" },
  { label: "S", value: "Sat" },
];

const AddActivity = ({
  allActivities,
  values,
  setValues,
  selectedActivity,
  repeatWeekly,
  setRepeatWeekly,
  selectedDays,
  toggleDay,
  selectedQs,
  toggleQ,
}) => {
  return (
    <View style={styles.container}>
      {/* ACTIVITY */}
      <View style={styles.section}>
        <CustomSelect
          label="Activity"
          icon="sparkles-outline"
          placeholder="Select activity"
          value={values.activity}
          onChange={(v) => {
            setValues((prev) => ({
              ...prev,
              activity: v,
            }));
          }}
          options={[
            ...allActivities.map((a) => ({
              label: a.title,
              value: a.title,
            })),
            {
              label: "Other",
              value: "Other",
            },
          ]}
        />
      </View>

      {/* CUSTOM ACTIVITY */}
      {values.activity === "Other" && (
        <View style={styles.section}>
          <CustomInput
            label="Activity Name"
            placeholder="Enter activity name"
            value={values.customActivity}
            onChangeText={(v) =>
              setValues((prev) => ({
                ...prev,
                customActivity: v,
              }))
            }
          />
        </View>
      )}

      {/* PREVIEW */}
      {selectedActivity && (
        <View style={styles.previewCard}>
          <View style={styles.previewIcon}>
            <Ionicons
              name={selectedActivity.icon || "sparkles"}
              size={22}
              color={Colors.primary}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CustomText variant="body-lg" weight="bold">
              {selectedActivity.title}
            </CustomText>

            <CustomText variant="body-sm" color={Colors.text.secondary}>
              {selectedActivity.description}
            </CustomText>
          </View>
        </View>
      )}

      {/* DURATION */}
      <View style={styles.section}>
        <CustomText
          variant="label-sm"
          color={Colors.text.secondary}
          style={styles.sectionLabel}
        >
          Duration
        </CustomText>

        <View style={styles.chipsRow}>
          {DURATIONS.map((d) => {
            const active = values.duration === d;

            return (
              <TouchableOpacity
                key={d}
                onPress={() =>
                  setValues((prev) => ({
                    ...prev,
                    duration: d,
                  }))
                }
                style={[styles.chip, active && styles.chipActive]}
              >
                <CustomText
                  variant="body-sm"
                  weight="bold"
                  color={active ? Colors.white : Colors.text.primary}
                >
                  {d}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* REPEAT */}
      <View style={styles.section}>
        <View style={styles.repeatHeader}>
          <CustomText variant="label-sm" color={Colors.text.secondary}>
            Repeat Weekly
          </CustomText>

          <Switch value={repeatWeekly} onValueChange={setRepeatWeekly} />
        </View>

        {repeatWeekly && (
          <View style={styles.daysRow}>
            {DAYS.map((d) => {
              const active = selectedDays.includes(d.value);

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
        )}
      </View>

      {/* DEVELOPMENT FOCUS */}
      <View style={styles.section}>
        <View style={styles.focusHeader}>
          <CustomText variant="label-sm" color={Colors.text.secondary}>
            Development Focus
          </CustomText>

          <CustomText variant="label-sm" weight="bold" color={Colors.primary}>
            SELECT ALL
          </CustomText>
        </View>

        <View style={styles.qGrid}>
          {ALL_Qs.map((q) => {
            const active = selectedQs.includes(q.name);

            return (
              <TouchableOpacity
                key={q.name}
                activeOpacity={0.9}
                onPress={() => toggleQ(q.name)}
                style={[
                  styles.qCard,
                  {
                    backgroundColor: active ? q.color : q.backgroundColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.qIcon,
                    {
                      backgroundColor: active
                        ? "rgba(255,255,255,0.2)"
                        : Colors.white,
                    },
                  ]}
                >
                  <Ionicons
                    name={q.icon}
                    size={18}
                    color={active ? Colors.white : q.color}
                  />
                </View>

                <CustomText
                  variant="body"
                  weight="bold"
                  color={active ? Colors.white : Colors.text.primary}
                >
                  {q.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AddActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    marginBottom: 14,
  },
  previewCard: {
    backgroundColor: Colors.surface_container_low,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  previewIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface_container_low,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  repeatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface_container_low,
  },
  dayActive: {
    backgroundColor: Colors.primary,
  },
  focusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  qGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  qCard: {
    width: "48%",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  qIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
});
