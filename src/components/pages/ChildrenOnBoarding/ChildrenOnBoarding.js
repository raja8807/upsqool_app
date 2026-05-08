import React, { useState, useRef, useEffect } from "react";
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
import { useCreateChild } from "@services/childService";

const ChildrenOnBoardingPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { userProfile, refreshCurrentUserProfile } = useAuth();

  const [gender, setGender] = useState("Male");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    school: "",
  });
  const [hours, setHours] = useState(5);
  const trackWidth = useRef(0);

  const handleSliderMove = (event) => {
    const { locationX } = event.nativeEvent;
    if (trackWidth.current > 0) {
      const percentage = Math.max(
        0,
        Math.min(locationX / trackWidth.current, 1),
      );
      const newHours = Math.round(percentage * 12);
      setHours(newHours);
    }
  };

  const { executeRequest } = useCreateChild();

  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    const childData = { ...form, gender, hours, dob: "2018-05-14" };
    const res = await executeRequest(childData);



    if (res.success) {
      await refreshCurrentUserProfile();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userProfile?.children?.length) {
      navigation.navigate("SelectGoals");
    }
  }, [userProfile?.children]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <OnboardingHeader
        step={2}
        totalSteps={4}
        title="Tell us about your child"
        subtitle="Personalizing the experience helps us provide more accurate development tracking."
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 },
        ]}
      >
        <View style={styles.photoContainer}>
          <View style={styles.photoCircle}>
            <Ionicons
              name="happy-outline"
              size={32}
              color={Colors.text.secondary}
            />
            <CustomText
              variant="label-sm"
              color={Colors.text.secondary}
              style={{ marginTop: 4 }}
            >
              Add Photo
            </CustomText>
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </View>
          </View>
        </View>

        <CustomText
          variant="body-lg"
          weight="bold"
          style={{ marginBottom: 16 }}
        >
          Gender
        </CustomText>
        <View style={styles.genderRow}>
          <TouchableOpacity
            style={[
              styles.genderBtn,
              gender === "Male" ? styles.genderActive : styles.genderInactive,
            ]}
            onPress={() => setGender("Male")}
          >
            <Ionicons
              name="male"
              size={20}
              color={gender === "Male" ? Colors.white : Colors.text.primary}
            />
            <CustomText
              variant="body-lg"
              weight="bold"
              color={gender === "Male" ? Colors.white : Colors.text.primary}
            >
              {" "}
              Male
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderBtn,
              gender === "Female" ? styles.genderActive : styles.genderInactive,
            ]}
            onPress={() => setGender("Female")}
          >
            <Ionicons
              name="female"
              size={20}
              color={gender === "Female" ? Colors.white : Colors.text.primary}
            />
            <CustomText
              variant="body-lg"
              weight="bold"
              color={gender === "Female" ? Colors.white : Colors.text.primary}
            >
              {" "}
              Female
            </CustomText>
          </TouchableOpacity>
        </View>

        <View style={styles.formRow}>
          <View style={{ flex: 1 }}>
            <Input
              label="FIRST NAME"
              placeholder="e.g. Leo"
              value={form.firstName}
              onChangeText={(t) => setForm({ ...form, firstName: t })}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              label="LAST NAME"
              placeholder="e.g. Silva"
              value={form.lastName}
              onChangeText={(t) => setForm({ ...form, lastName: t })}
            />
          </View>
        </View>

        <Input
          label="DATE OF BIRTH"
          placeholder="mm/dd/yyyy"
          value={form.dob}
          onChangeText={(t) => setForm({ ...form, dob: t })}
          icon="calendar"
        />

        <Input
          label="SCHOOL (OPTIONAL)"
          placeholder="Search school name..."
          value={form.school}
          onChangeText={(t) => setForm({ ...form, school: t })}
        />

        <View style={styles.sliderCard}>
          <View style={styles.sliderHeader}>
            <View style={{ flex: 1 }}>
              <CustomText
                variant="body-lg"
                weight="bold"
                color={Colors.text.primary}
              >
                Development time per day
              </CustomText>
              <CustomText
                variant="label"
                color={Colors.text.secondary}
                style={{ marginTop: 4 }}
              >
                Estimate hours spent in active learning or play.
              </CustomText>
            </View>
            <View style={{ alignItems: "center" }}>
              <CustomText
                variant="display-md"
                weight="bold"
                color={Colors.primary_container}
              >
                {hours}
              </CustomText>
              <CustomText
                variant="label-sm"
                weight="bold"
                color={Colors.primary_container}
              >
                HRS
              </CustomText>
            </View>
          </View>

          <View
            style={styles.sliderTrack}
            onLayout={(e) => (trackWidth.current = e.nativeEvent.layout.width)}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={handleSliderMove}
            onResponderMove={handleSliderMove}
          >
            <View style={styles.sliderTrackBg} />
            <View
              pointerEvents="none"
              style={[styles.sliderFill, { width: `${(hours / 12) * 100}%` }]}
            />
            <View
              pointerEvents="none"
              style={[styles.sliderThumb, { left: `${(hours / 12) * 100}%` }]}
            />
          </View>
          <View style={styles.sliderLabels}>
            <CustomText variant="label-sm" color={Colors.text.light}>
              0 HOURS
            </CustomText>
            <CustomText variant="label-sm" color={Colors.text.light}>
              12 HOURS
            </CustomText>
          </View>
        </View>

        <View style={{ height: 32 }} />

        <Button title="Next  ➔" variant="primary" onPress={handleNext}
          loading={loading}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surface_container_low,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  genderRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  genderBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 24,
  },
  genderActive: {
    backgroundColor: Colors.primary_container,
  },
  genderInactive: {
    backgroundColor: Colors.surface_container_lowest,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  sliderCard: {
    backgroundColor: Colors.surface_container_lowest,
    padding: 24,
    borderRadius: 24,
    marginTop: 16,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  sliderTrack: {
    height: 30, // Increased height for easier touch
    justifyContent: "center",
  },
  sliderTrackBg: {
    height: 8,
    backgroundColor: Colors.primary_fixed,
    borderRadius: 4,
    width: "100%",
    position: "absolute",
  },
  sliderFill: {
    position: "absolute",
    left: 0,
    height: 8,
    backgroundColor: Colors.primary_container,
    borderRadius: 4,
  },
  sliderThumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginLeft: -12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});

export default ChildrenOnBoardingPage;
