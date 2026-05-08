import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../../UI/Text/Text";
import { Colors } from "../../../../styles/colors";

const DashboardHeader = ({
  childName,
  avatarUrl,
  navigateToSettings,
  onSwitchChildPress,
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const initial = childName ? childName.charAt(0).toUpperCase() : "?";

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity
          style={styles.childToggle}
          onPress={onSwitchChildPress}
          activeOpacity={0.7}
        >
          <View style={styles.avatarWrapper}>
            {avatarUrl ? (
              <View style={styles.avatarPlaceholder}>
                {/* Image component would go here */}
                <Ionicons name="person" size={24} color={Colors.primary} />
              </View>
            ) : (
              <View style={[styles.initialAvatar, { backgroundColor: Colors.primary + '15' }]}>
                <CustomText variant="body-lg" weight="bold" color={Colors.primary}>
                  {initial}
                </CustomText>
              </View>
            )}
          </View>
          <View>
            <View style={styles.nameRow}>
              <CustomText variant="display-md" weight="bold">
                {childName}
              </CustomText>
              <Ionicons
                name="chevron-down"
                size={16}
                color={Colors.text.secondary}
                style={styles.chevron}
              />
            </View>
            <CustomText variant="label-sm" color={Colors.text.secondary}>
              {today}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.settings} onPress={navigateToSettings}>
        <View style={styles.settingsIconWrapper}>
          <Ionicons name="notifications-outline" size={22} color={Colors.text.light} />
          <View style={styles.notificationDot} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  avatarWrapper: {
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.surface_container_low,
    justifyContent: "center",
    alignItems: "center",
  },
  initialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  childToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  chevron: {
    marginLeft: 6,
  },
  settingsIconWrapper: {
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
  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary_container,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});

export default DashboardHeader;
