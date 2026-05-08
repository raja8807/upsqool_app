import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@styles/colors";
import { CustomText } from "@components/UI/Text/Text";
import Button from "@components/UI/Button/Button";
import OnboardingHeader from "./components/OnboardingHeader";
import ToggleCard from "./components/ToggleCard";
import { useAuth } from "@context/AuthContext";
import { useUpdateChild } from "@services/childService";

const INTERESTS_DATA = [
  { id: "drawing", title: "Drawing", icon: "color-palette" },
  { id: "sports", title: "Sports", icon: "football" },
  { id: "music", title: "Music", icon: "musical-notes" },
  { id: "reading", title: "Reading", icon: "book" },
  { id: "puzzles", title: "Puzzles", icon: "extension-puzzle" },
  { id: "dance", title: "Dance", icon: "body" },
  { id: "science", title: "Science", icon: "flask" },
  { id: "nature", title: "Nature", icon: "leaf" },
];

const SelectInterestsPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();

  const { userProfile, refreshCurrentUserProfile } = useAuth();

  const currentChild = userProfile.children[0];

  const [selected, setSelected] = useState(
    currentChild?.interests?.[0] ? currentChild?.interests : ["Drawing"],
  );
  const { executeRequest } = useUpdateChild(currentChild.id);


  const [loading, setIsLoading] = useState(false);


  const saveChildProfile = async () => {
    setIsLoading(true);
    const res = await executeRequest({ ...currentChild, interests: selected }, `child/${currentChild.id}`);

    if (res.success) {
      await refreshCurrentUserProfile();
    }
    setIsLoading(false);

  };

  // useEffect(() => {
  //   if (currentChild?.interests?.length) {
  //     completeOnboarding();
  //   }
  // }, [userProfile]);

  const toggleInterest = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // const handContinue = async () => {
  //   await saveChildProfile();
  //   await completeOnboarding();
  //   // Router logic in AppNavigator handles switching to MainStack automatically
  // };

  return (
    <View style={styles.container}>
      <OnboardingHeader
        step={4}
        totalSteps={4}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 },
        ]}
      >
        <View style={styles.headerText}>
          <CustomText
            variant="display-md"
            weight="bold"
            color={Colors.text.primary}
            style={{ letterSpacing: -0.5 }}
          >
            What does your child enjoy?
          </CustomText>
          <CustomText
            variant="body-lg"
            color={Colors.text.secondary}
            style={{ marginTop: 8, lineHeight: 24 }}
          >
            Select a few to personalize the experience
          </CustomText>
        </View>

        <View style={styles.grid}>
          {INTERESTS_DATA.map((interest) => (
            <View key={interest.id} style={styles.gridItem}>
              <ToggleCard
                title={interest.title}
                icon={interest.icon}
                isSelected={selected.includes(interest.id)}
                useCheckStyle={false}
                vertical={true}
                onPress={() => toggleInterest(interest.id)}
              />
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />

        <Button title="Continue" variant="primary" onPress={saveChildProfile}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  headerText: {
    marginBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6, // Offset for ToggleCard margins inside the grid
  },
  gridItem: {
    width: "50%",
    height: 160,
    padding: 2,
  },
});

export default SelectInterestsPage;
