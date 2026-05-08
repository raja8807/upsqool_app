import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { AuthProvider } from "@context/AuthContext";
import { ThemeProvider } from "@context/ThemeContext";
import { DataProvider } from "./src/context/DataContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { Colors } from "@styles/colors";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {

    async function prepare() {
      try {
        // Keep the splash screen visible for at least 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <DataProvider>
            <AppNavigator />
            <StatusBar style="light" backgroundColor={Colors.primary} />
          </DataProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
