import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

const CustomOtpInput = ({
  length = 6,
  value = "",
  onChange,
  autoFocus = true,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      // Handle full OTP paste
      const otp = text.slice(0, length);
      onChange(otp);
      otp.split("").forEach((char, i) => {
        inputsRef.current[i]?.setNativeProps({ text: char });
      });
      return;
    }

    const newValue = value.split("");
    newValue[index] = text;
    const updated = newValue.join("").slice(0, length);
    onChange(updated);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => (inputsRef.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            defaultValue={value[index] || ""}
            autoFocus={autoFocus && index === 0}
          />
        </View>
      ))}
    </View>
  );
};

export default CustomOtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    width: 50,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 24,
    color: Colors.secondary,
    textAlign: "center",
    fontWeight: "500",
  },

  //   input: {
  //     width: 48,
  //     height: 56,
  //     borderRadius: 14,
  //     borderWidth: 1.5,
  //     borderColor: "#E5E7EB",
  //     textAlign: "center",
  //     fontSize: 20,
  //     fontWeight: "600",
  //     color: Colors.text.dark,
  //     backgroundColor: "#fff",
  //   },
});
