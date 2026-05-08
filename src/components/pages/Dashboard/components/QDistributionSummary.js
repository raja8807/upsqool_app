import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CustomText from "../../../UI/Text/Text";
import { Colors } from "../../../../styles/colors";
import { ALL_Qs } from "src/constants/constants";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 56) / 2;

const QCard = ({ q }) => {
  const { name, percentage, backgroundColor, color, icon } = q;

  return (
    <View style={[styles.qBigCard, {
      backgroundColor,

    }]}>
      <View style={styles.qIconTopWrapper}>
        <Ionicons name={icon} size={24} color={color} />
        <CustomText variant="body-lg" weight="bold" style={styles.qCardTitle}>
          {name}
        </CustomText>
      </View>



      <View style={styles.qCardBottomRow}>
        <View style={styles.qCardProgressBarBg}>
          <View
            style={[
              styles.qCardProgressBarFill,
              {
                width: `${percentage}%`,
                backgroundColor: color,
              },
            ]}
          />
        </View>

        <CustomText variant="label-sm" color={Colors.text.secondary}>
          {percentage}%
        </CustomText>
      </View>
    </View >
  );
};

const QDistributionSummary = ({ data }) => {
  const {
    Intelligence = 50,
    Emotional = 50,
    Creative = 50,
    Physical = 50,
    Values = 50,
  } = data || {};

  const Qs = ALL_Qs;

  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleRow}>
        <CustomText variant="headline" weight="bold">
          Q Distribution
        </CustomText>

        <TouchableOpacity>
          <CustomText variant="label" weight="bold" color={Colors.primary}>
            DETAILS &gt;
          </CustomText>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {Qs.map((q) => (
          <QCard key={q.name} q={q} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },

  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  qBigCard: {
    width: '100%',
    // height: 140,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },

  qIconTopWrapper: {
    alignSelf: "flex-start",
    marginBottom: "auto",
    flexDirection: "row",

  },

  qCardTitle: {
    marginTop: "auto",

  },

  qCardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  qCardProgressBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.outline_variant,
    borderRadius: 2,
    marginRight: 8,
    overflow: "hidden",
  },

  qCardProgressBarFill: {
    height: 4,
    borderRadius: 2,
  },
});

export default QDistributionSummary;
