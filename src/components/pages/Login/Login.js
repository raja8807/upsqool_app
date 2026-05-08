import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@styles/colors";
import { useAuth } from "@context/AuthContext";

import Button from "@components/UI/Button/Button";
import Input from "@components/UI/Input/Input";
import CustomText from "@components/UI/Text/Text";

const Login = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { Login: loginUser, SignUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (activeTab === "login") {
        const { error } = await loginUser(email, password);
        if (error) alert(error.message);
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        const { error } = await SignUp(email, password);
        if (error) {
          alert(error.message);
        } else {
          alert("Success! Please check your email for verification.");
          setActiveTab("login");
        }
      }
    } catch (e) {
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background Gradient Accent */}
      <LinearGradient
        colors={[Colors.primary_fixed + "40", Colors.surface]}
        style={styles.backgroundAccent}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <CustomText
              variant="display"
              weight="bold"
              color={Colors.primary}
              style={styles.logoText}
            >
              UpSqool
            </CustomText>
            <View style={styles.placeholder} />
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <CustomText
              variant="display-lg"
              color={Colors.on_surface}
              style={styles.title}
            >
              Welcome
            </CustomText>
            <CustomText
              variant="body-lg"
              color={Colors.on_surface_variant}
              style={styles.subtitle}
            >
              The journey of your child’s legacy starts here.
            </CustomText>
          </View>

          {/* Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "login" && styles.activeToggleButton,
              ]}
              onPress={() => setActiveTab("login")}
            >
              <CustomText
                variant="body"
                weight={activeTab === "login" ? "semiBold" : "medium"}
                color={
                  activeTab === "login"
                    ? Colors.on_surface
                    : Colors.on_surface_variant
                }
              >
                Login
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeTab === "signup" && styles.activeToggleButton,
              ]}
              onPress={() => setActiveTab("signup")}
            >
              <CustomText
                variant="body"
                weight={activeTab === "signup" ? "semiBold" : "medium"}
                color={
                  activeTab === "signup"
                    ? Colors.on_surface
                    : Colors.on_surface_variant
                }
              >
                Signup
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Input
              label="Email address"
              icon="mail-outline"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              icon="lock-closed-outline"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {activeTab === "signup" && (
              <Input
                label="Confirm Password"
                icon="lock-closed-outline"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}

            {activeTab === "login" && (
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <CustomText
                  variant="body"
                  weight="semiBold"
                  color={Colors.primary}
                >
                  Forgot password?
                </CustomText>
              </TouchableOpacity>
            )}

            <Button
              title={activeTab === "login" ? "Login" : "Create Account"}
              variant="primary"
              onPress={handleSubmit}
              loading={loading}
              style={{ marginTop: 8 }}
            />
          </View>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <CustomText
              variant="label"
              weight="medium"
              color={Colors.on_surface_variant}
              style={styles.dividerText}
            >
              OR
            </CustomText>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login */}
          <Button
            title="Continue with Google"
            variant="outline"
            icon="logo-google"
            iconColor="#DB4437"
            style={{ marginBottom: 32 }}
          />

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Footer */}
          <View style={styles.footerContainer}>
            <CustomText
              variant="label-sm"
              color={Colors.on_surface_variant}
              style={styles.footerText}
            >
              By continuing, you agree to our{" "}
              <CustomText
                variant="label-sm"
                weight="semiBold"
                color={Colors.on_surface_variant}
                style={{ textDecorationLine: "underline" }}
              >
                Terms of Service
              </CustomText>{" "}
              and{" "}
              <CustomText
                variant="label-sm"
                weight="semiBold"
                color={Colors.on_surface_variant}
                style={{ textDecorationLine: "underline" }}
              >
                Privacy Policy
              </CustomText>
              .{"\n"}
              Designed for mindful parents and future archives.
            </CustomText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  backgroundAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  logoText: {
    fontSize: 24,
    fontStyle: "italic",
  },
  placeholder: {
    width: 40,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 24,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.surface_container_low,
    borderRadius: 20,
    padding: 4,
    marginBottom: 32,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 16,
  },
  activeToggleButton: {
    backgroundColor: Colors.surface_container_lowest,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formContainer: {
    marginBottom: 32,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surface_container_highest,
  },
  dividerText: {
    paddingHorizontal: 16,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  footerText: {
    textAlign: "center",
    lineHeight: 18,
  },
});
