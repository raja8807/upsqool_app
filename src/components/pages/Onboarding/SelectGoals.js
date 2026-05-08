import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@styles/colors";
import { CustomText } from "@components/UI/Text/Text";
import Button from "@components/UI/Button/Button";
import OnboardingHeader from "./components/OnboardingHeader";
import ToggleCard from "./components/ToggleCard";

const GOALS_DATA = [
  {
    id: "intelligence",
    title: "Intelligence",
    subtitle: "Learning & thinking skills",
    icon: "bulb",
  },
  {
    id: "emotional",
    title: "Emotional",
    subtitle: "Feelings & relationships",
    icon: "heart",
  },
  {
    id: "creative",
    title: "Creative",
    subtitle: "Art & imagination",
    icon: "color-palette",
  },
  {
    id: "physical",
    title: "Physical",
    subtitle: "Health & fitness",
    icon: "barbell",
  },
  {
    id: "values",
    title: "Values",
    subtitle: "Ethics & behavior",
    icon: "leaf",
  },
];

import { useAuth } from "@context/AuthContext";
import { useUpdateChild } from "@services/childService";

const SelectGoalsPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { userProfile, refreshCurrentUserProfile } = useAuth();

  const currentChild = userProfile.children[0];

  const [selected, setSelected] = useState(["intelligence"]);

  const { executeRequest } = useUpdateChild(currentChild.id);

  const [loading, setIsLoading] = useState(false);

  const saveChildProfile = async () => {
    setIsLoading(true);
    const res = await executeRequest({ ...currentChild, goals: selected }, `child/${currentChild.id}`);
    if (res.success) {
      await refreshCurrentUserProfile();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentChild?.goals?.length) {
      navigation.navigate("SelectInterests");
    }
  }, [userProfile]);

  const toggleGoal = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingHeader
        step={3}
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
            What do you want to focus on?
          </CustomText>
          <CustomText
            variant="body-lg"
            color={Colors.text.secondary}
            style={{ marginTop: 8, lineHeight: 24 }}
          >
            Select areas to prioritize for your child
          </CustomText>
        </View>

        <View style={styles.goalsList}>
          {GOALS_DATA.map((goal) => (
            <ToggleCard
              key={goal.id}
              title={goal.title}
              subtitle={goal.subtitle}
              icon={goal.icon}
              isSelected={selected.includes(goal.id)}
              useCheckStyle={true}
              onPress={() => toggleGoal(goal.id)}
            />
          ))}
        </View>

        <View style={{ height: 32 }} />

        <Button
          title="Continue  ➔"
          variant="primary"
          onPress={saveChildProfile}
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
  goalsList: {
    gap: 16,
  },
});

export default SelectGoalsPage;
