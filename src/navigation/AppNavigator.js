import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../styles/colors";
import { ActivityIndicator, View } from "react-native";

// Auth Stack Screens
import LoginScreen from "../screens/LoginScreen";

// Main Tab Screens (Nav Wrappers)
import HomeScreen from "../screens/HomeScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import InsightScreen from "../screens/InsightScreen";
import ResourceScreen from "../screens/ResourceScreen";
import SettingScreen from "../screens/SettingScreen";

// Additional MainStack Screens
import DashboardScreen from "../screens/DashboardScreen";
import ListOfChildren from "../screens/ListOfChildren";
import ChangePassword from "../screens/ChangePassword";
import ManageSecondaryUser from "../screens/ManageSecondaryUser";
import AddReviewScreen from "../screens/AddReviewScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import FindNewActivityScreen from "../screens/FindNewActivityScreen";
import PhotoViewerScreen from "../screens/PhotoViewerScreen";

// Onboarding Stack Screens
import UserOnBoarding from "../screens/UserOnBoarding";
import ChildrenOnBoarding from "../screens/ChildrenOnBoarding";
import SelectGoals from "../screens/SelectGoals";
import SelectInterests from "../screens/SelectInterests";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator



      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const isChatScreen = routeName === "ChatScreen";


        return {
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "ellipse";
            if (route.name === "Home") iconName = focused ? "home" : "home-outline";
            if (route.name === "Activities") iconName = focused ? "list" : "list-outline";
            if (route.name === "Insight") iconName = focused ? "pie-chart" : "pie-chart-outline";
            if (route.name === "Resource") iconName = focused ? "library" : "library-outline";
            if (route.name === "Setting") iconName = focused ? "settings" : "settings-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text?.secondary || "#40484C",
          tabBarShowLabel: true,
          tabBarStyle: {
            display: isChatScreen ? "none" : "flex",
            backgroundColor: Colors.surface_container_lowest || "#FFFFFF",
            borderTopWidth: 0,
            paddingTop: 5,
            height: 60,
            paddingBottom: 10,
            marginBottom: 20
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Insight" component={InsightScreen} />
      <Tab.Screen name="Resource" component={ResourceScreen} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ListOfChildren" component={ListOfChildren} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ManageSecondaryUser" component={ManageSecondaryUser} />
      <Stack.Screen name="AddReviewScreen" component={AddReviewScreen} />
      <Stack.Screen name="AddActivityScreen" component={AddActivityScreen} />
      <Stack.Screen name="FindNewActivityScreen" component={FindNewActivityScreen} />
      <Stack.Screen name="PhotoViewerScreen" component={PhotoViewerScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />

    </Stack.Navigator>
  );
};

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <Stack.Screen name="UserOnBoarding" component={UserOnBoarding} />
      <Stack.Screen name="ChildrenOnBoarding" component={ChildrenOnBoarding} />
      <Stack.Screen name="SelectGoals" component={SelectGoals} />
      <Stack.Screen name="SelectInterests" component={SelectInterests} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const { session, loading, onboardingComplete } = useAuth();



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const getCurrentStack = () => {

    console.log('--->>', onboardingComplete);

    if (session) {
      if (onboardingComplete) {
        return <MainStack />;
      }
      return <OnboardingStack />;
    } else {
      return <AuthStack />;
    }
  };

  return <NavigationContainer>{getCurrentStack()}</NavigationContainer>;
};
