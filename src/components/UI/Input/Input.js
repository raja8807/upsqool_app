import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

const CustomInput = ({ label, icon, error, containerStyle, ...props }) => {
  return (
    <View style={[styles.inputGroup, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={Colors.on_surface_variant}
            style={styles.inputIcon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.on_surface_variant}
          selectionColor={Colors.primary}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.body.semiBold,
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface_container_low,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.body.regular,
    fontSize: 16,
    color: Colors.on_surface,
  },
  errorText: {
    fontFamily: Fonts.body.regular,
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomInput;
