import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@styles/colors";
import CustomText from "@components/UI/Text/Text";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
    title,
    showLogo = false,
    onBackPress,
    leftComponent,
    rightComponent,
    style
}) => {
    return (
        <View style={[styles.header, style]}>
            <View style={styles.headerLeft}>
                {onBackPress ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                ) : showLogo ? (
                    <View style={styles.logoCircle}>
                        <Ionicons name="heart" size={20} color="white" />
                    </View>
                ) : (
                    leftComponent
                )}
                {title && (
                    <CustomText variant="title" size={24} style={styles.headerTitle}>
                        {title}
                    </CustomText>
                )}
            </View>
            <View style={styles.headerActions}>
                {rightComponent}
            </View>
        </View>
    );
};

export const HeaderIconButton = ({ icon, onPress, style }) => (
    <TouchableOpacity style={[styles.headerIconButton, style]} onPress={onPress}>
        {icon}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.background,
        marginTop: 30,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    backButton: {
        marginRight: 15,
    },
    logoCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    headerTitle: {
        fontWeight: "bold",
        color: Colors.text.primary,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerIconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.card,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
});

export default Header;
