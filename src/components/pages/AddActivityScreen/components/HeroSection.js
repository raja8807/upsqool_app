import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@components/UI/Text/Text";
import { Colors } from "@styles/colors";

const HeroSection = () => {
  return (
    <View style={styles.hero}>
      <CustomText
        variant="label-sm"
        weight="bold"
        color={Colors.primary}
        style={styles.heroTag}
      >
        NEW ENTRY
      </CustomText>

      <CustomText variant="display-lg" weight="bold">
        Capture the{" "}
        <CustomText
          variant="display-lg"
          weight="bold"
          color={Colors.primary}
        >
          Growth
        </CustomText>
      </CustomText>

      <CustomText
        variant="body"
        color={Colors.text.secondary}
        style={styles.heroSubtitle}
      >
        Every moment matters. Track your child’s journey with precision and heart.
      </CustomText>
    </View>
  );
};

export default HeroSection;

const styles = StyleSheet.create({
  hero: {
    marginBottom: 32,
  },
  heroTag: {
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  heroSubtitle: {
    marginTop: 12,
    lineHeight: 22,
  },
});
