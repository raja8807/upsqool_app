import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@styles/colors";
import { CustomText } from "@components/UI/Text/Text";
import Button from "@components/UI/Button/Button";
import Input from "@components/UI/Input/Input";
import { Ionicons } from "@expo/vector-icons";
import OnboardingHeader from "../Onboarding/components/OnboardingHeader";
import { useAuth } from "@context/AuthContext";

const InfoCard = ({ icon, iconBg, iconColor, title, subtitle, bgColor }) => (
  <View style={[styles.infoCard, { backgroundColor: bgColor }]}>
    <View style={[styles.infoIcon, { backgroundColor: iconBg }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.infoText}>
      <CustomText variant="body-lg" weight="bold" color={Colors.text.primary}>
        {title}
      </CustomText>
      <CustomText
        variant="label"
        color={Colors.text.secondary}
        style={{ marginTop: 2, lineHeight: 18 }}
      >
        {subtitle}
      </CustomText>
    </View>
  </View>
);

const UserOnBoardingPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { logout, userProfile, saveUserProfile } = useAuth();

  const [form, setForm] = useState(
    userProfile || {
      firstName: "",
      lastName: "",
      email: "",
      location: "",
    },
  );

  const handlesaveUserProfile = async () => {
    await saveUserProfile(form);
  };

  useEffect(() => {
    if (userProfile) {
      navigation.navigate("ChildrenOnBoarding");
    }
  }, [userProfile]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <OnboardingHeader
        step={1}
        totalSteps={4}
        title="Let's get to know you."
        subtitle="Please fill in your basic information to personalize your archiving experience for your child."
        onBack={logout}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 },
        ]}
      >
        {/* Photo Upload Circle placeholder */}
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Ionicons name="camera-outline" size={32} color={Colors.primary} />
            <CustomText
              variant="label-sm"
              color={Colors.primary}
              style={{ marginTop: 4 }}
            >
              Add Photo
            </CustomText>
          </View>
        </View>

        {/* Inputs */}
        <View style={styles.formGroup}>
          <Input
            label="FIRST NAME"
            placeholder="e.g. Sarah"
            value={form.firstName}
            onChangeText={(t) => setForm({ ...form, firstName: t })}
          />
          <Input
            label="LAST NAME"
            placeholder="e.g. Mitchell"
            value={form.lastName}
            onChangeText={(t) => setForm({ ...form, lastName: t })}
          />

          <Input
            label="LOCATION"
            placeholder="San Francisco, CA"
            value={form.location}
            onChangeText={(t) => setForm({ ...form, location: t })}
            icon="location"
          />
          <CustomText
            variant="label-sm"
            color={Colors.text.light}
            style={{ fontStyle: "italic", marginTop: -8, marginBottom: 16 }}
          >
            Used to suggest local development resources and clinics.
          </CustomText>
        </View>

        {/* Info Cards */}
        <InfoCard
          icon="shield-checkmark"
          iconColor={Colors.white}
          iconBg={Colors.primary_container}
          bgColor="#EAF6F2"
          title="Privacy First"
          subtitle="Your data is encrypted and never shared without explicit permission."
        />

        <InfoCard
          icon="sparkles"
          iconColor={Colors.white}
          iconBg={Colors.secondary_container}
          bgColor="#FFF0E6"
          title="Personalized Insights"
          subtitle="Accurate profile info helps us tailor the milestones to your journey."
        />

        <View style={{ height: 32 }} />

        <Button
          title="Next  ➔"
          variant="primary"
          onPress={handlesaveUserProfile}
          // onPress={async () => {
          //   await saveUserProfile(form);
          //   // navigation.navigate("ChildrenOnBoarding");
          // }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  photoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E1E3E4",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface_container_lowest,
  },
  formGroup: {
    backgroundColor: Colors.surface_container_lowest,
    padding: 24,
    borderRadius: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 24,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    gap: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
  },
});

export default UserOnBoardingPage;
