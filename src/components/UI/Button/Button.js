import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

const Button = ({
  title,
  onPress,
  variant = "primary", // primary, secondary, outline
  icon,
  iconColor,
  style,
  textStyle,
  loading = false,
  disabled = false,
  ...props
}) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOutline = variant === "outline";

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator color={isPrimary ? Colors.white : Colors.primary} />
      ) : (
        <>
          {icon && (
            <Ionicons 
              name={icon} 
              size={20} 
              color={iconColor || (isPrimary ? Colors.white : Colors.on_surface)} 
              style={styles.icon} 
            />
          )}
          {title && (
            <Text style={[
              styles.text,
              isPrimary && styles.textPrimary,
              isSecondary && styles.textSecondary,
              isOutline && styles.textOutline,
              textStyle
            ]}>
              {title}
            </Text>
          )}
        </>
      )}
    </>
  );

  if (isPrimary) {
    return (
      <TouchableOpacity 
        style={[styles.primaryContainer, style]} 
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primary_container]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        isSecondary && styles.secondaryButton,
        isOutline && styles.outlineButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryContainer: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 4,
    borderRadius: 28,
  },
  gradient: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  baseButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  secondaryButton: {
    backgroundColor: Colors.surface_container_highest,
  },
  outlineButton: {
    backgroundColor: Colors.surface_container_lowest,
    borderWidth: 1,
    borderColor: Colors.outline_variant,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontFamily: Fonts.body.semiBold,
    fontSize: 16,
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.on_surface,
  },
  textOutline: {
    color: Colors.on_surface,
  },
});

export default Button;
