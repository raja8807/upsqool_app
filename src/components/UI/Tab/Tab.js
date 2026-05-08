import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import CustomText from "../Text/Text";

const CustomTabs = ({ tabs = [], activeTab, onChange }) => {
  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.9}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            {tab.icon && (
              <Ionicons
                name={tab.icon}
                size={22}
                color={isActive ? Colors.primary : "#64748B"}
              />
            )}

            <CustomText style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#ECEEF2",
    borderRadius: 12,
    padding: 2,
    alignItems: "center",
    marginBottom: 24,
  },

  tab: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 2,
  },

  label: {
    fontWeight: "600",
    color: "#64748B",
  },

  activeLabel: {
    color: Colors.primary,
  },
});
