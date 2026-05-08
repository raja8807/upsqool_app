import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import CustomText from "@components/UI/Text/Text";

const Checkbox = ({ label, value, onValueChange, style, labelStyle }) => (
    <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.7}
        onPress={() => onValueChange(!value)}
    >
        <View style={[styles.checkbox, value && styles.checkboxActive]}>
            {value && <Ionicons name="checkmark" size={13} color={Colors.secondary} />}
        </View>
        {label && (
            <CustomText variant="body" size={12} style={[styles.label, labelStyle]}>
                {label}
            </CustomText>
        )}
    </TouchableOpacity>
);

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    checkboxActive: {
        backgroundColor: Colors.background,
        borderColor: Colors.secondary,
    },
    label: {
        color: "#6B7280",
    },
});
