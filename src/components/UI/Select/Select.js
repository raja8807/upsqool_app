import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

const CustomSelect = ({
  label,
  icon,
  error,
  value,
  placeholder = "Select",
  options = [],
  onChange,
  containerStyle,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find((item) => item.value === value);

  return (
    <>
      <View style={[styles.inputGroup, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setVisible(true)}
          style={[styles.inputContainer, error && styles.inputError]}
        >
          <View style={styles.left}>
            {icon && (
              <Ionicons
                name={icon}
                size={20}
                color={Colors.on_surface_variant}
                style={styles.inputIcon}
              />
            )}

            <Text
              style={[styles.inputText, !selectedOption && styles.placeholder]}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
          </View>

          <Ionicons
            name="chevron-down"
            size={20}
            color={Colors.on_surface_variant}
          />
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.value === value;

                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.option, isSelected && styles.selectedOption]}
                    onPress={() => {
                      onChange(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>

                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={Colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default CustomSelect;

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
    justifyContent: "space-between",

    backgroundColor: Colors.surface_container_low,

    borderRadius: 20,

    paddingHorizontal: 16,

    height: 56,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },

  inputIcon: {
    marginRight: 12,
  },

  inputText: {
    fontFamily: Fonts.body.regular,
    fontSize: 16,
    color: Colors.on_surface,
  },

  placeholder: {
    color: Colors.on_surface_variant,
  },

  errorText: {
    fontFamily: Fonts.body.regular,
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: Colors.surface,

    borderRadius: 24,

    maxHeight: 400,

    paddingVertical: 8,
  },

  option: {
    height: 56,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedOption: {
    backgroundColor: Colors.surface_container_low,
  },

  optionText: {
    fontFamily: Fonts.body.medium,
    fontSize: 16,
    color: Colors.on_surface,
  },

  selectedOptionText: {
    color: Colors.primary,
  },
});
