import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import CustomText from "@components/UI/Text/Text";

const InfoModal = ({ visible, onClose, message, title = "Information" }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                style={styles.modalOverlay}
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <Ionicons name="information-circle" size={40} color={Colors.secondary} style={styles.icon} />
                    {title && (
                        <CustomText variant="title" size={18} style={styles.modalTitle}>
                            {title}
                        </CustomText>
                    )}
                    <CustomText variant="body" size={16} style={styles.message}>
                        {message}
                    </CustomText>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalCloseButton}
                    >
                        <CustomText color="white" weight="600">Got it</CustomText>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

export default InfoModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 24,
        padding: 30,
        alignItems: "center",
        width: "100%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    icon: {
        marginBottom: 15,
    },
    modalTitle: {
        marginBottom: 10,
        color: Colors.primary,
        textAlign: "center",
    },
    message: {
        textAlign: "center",
        lineHeight: 24,
        color: "#4B5563",
    },
    modalCloseButton: {
        marginTop: 25,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 12,
    }
});
