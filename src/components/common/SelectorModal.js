import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@styles/colors";
import CustomButton from "@components/UI/Button/Button";
import CustomText from "@components/UI/Text/Text";

const SelectorModal = ({ show, setShow, items, title, caption, multiSelect = false }) => {
    return (
        <Modal
            visible={show}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShow(false)}
        >
            <Pressable
                style={styles.modalOverlay}
                onPress={() => setShow(false)}
            >
                <View style={styles.modalContent}>
                    <CustomText variant="title" size={20} style={styles.modalTitle}>{title}</CustomText>
                    {caption && (
                        <CustomText color={Colors.text.light} style={styles.modalCaption}>
                            {caption}
                        </CustomText>
                    )}
                    <View style={styles.optionsList}>
                        {items.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    item.onPress();
                                    if (!multiSelect && !item.remainAfterSelect) {
                                        setShow(false);
                                    }
                                }}
                            >
                                <CustomText size={16}>{item.text}</CustomText>
                                {item.selected && (
                                    <View style={styles.selectedIndicator}>
                                        <Ionicons name="checkmark" size={16} color="white" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {multiSelect && (
                        <CustomButton
                            type="gradiant"
                            onPress={() => setShow(false)}
                            style={styles.doneButton}
                        >
                            Done
                        </CustomButton>
                    )}
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        paddingBottom: 50,
    },
    modalTitle: {
        marginBottom: 10,
        textAlign: "center",
        color: Colors.primary,
    },
    modalCaption: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 14,
    },
    optionsList: {
        marginBottom: 20,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    selectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    doneButton: {
        width: "100%",
        marginTop: 10,
    },
});

export default SelectorModal;
