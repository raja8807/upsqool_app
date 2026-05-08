import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../Text/Text";
import { Colors } from "../../../styles/colors";
import { useAuth } from "../../../context/AuthContext";

const { height } = Dimensions.get("window");

const ChildSelectorModal = ({ visible, onClose, onAddChild }) => {
  const { children, activeChildId, switchChild } = useAuth();

  const handleSelectChild = (id) => {
    switchChild(id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.sheetContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetCard}>
              <View style={styles.handle} />

              <CustomText
                variant="headline-md"
                weight="bold"
                style={styles.title}
              >
                Switch Profile
              </CustomText>
              <CustomText
                variant="body"
                color={Colors.text.secondary}
                style={styles.subtitle}
              >
                Choose which child's progress you want to track.
              </CustomText>

              <ScrollView
                style={styles.childrenList}
                showsVerticalScrollIndicator={false}
              >
                {children.map((child) => {
                  const isActive = child.id === activeChildId;
                  return (
                    <TouchableOpacity
                      key={child.id}
                      style={[
                        styles.childItem,
                        isActive && styles.childItemActive,
                      ]}
                      onPress={() => handleSelectChild(child.id)}
                    >
                      <View
                        style={[
                          styles.avatar,
                          {
                            backgroundColor: isActive
                              ? Colors.primary
                              : Colors.surface_container_low,
                          },
                        ]}
                      >
                        <Ionicons
                          name="person"
                          size={24}
                          color={isActive ? Colors.white : Colors.primary}
                        />
                      </View>
                      <View style={styles.childInfo}>
                        <CustomText
                          variant="body-lg"
                          weight="bold"
                          color={
                            isActive ? Colors.primary : Colors.text.primary
                          }
                        >
                          {child.first_name} {child.last_name}
                        </CustomText>
                        {isActive && (
                          <CustomText variant="label-sm" color={Colors.primary}>
                            Currently Active
                          </CustomText>
                        )}
                      </View>
                      {isActive && (
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color={Colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <TouchableOpacity style={styles.addBtn} onPress={onAddChild}>
                <View style={styles.addIconWrapper}>
                  <Ionicons name="add" size={24} color={Colors.primary} />
                </View>
                <CustomText
                  variant="body-lg"
                  weight="bold"
                  color={Colors.primary}
                >
                  Add Another Child
                </CustomText>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    width: "100%",
  },
  sheetCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    maxHeight: height * 0.7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  childrenList: {
    marginBottom: 16,
  },
  childItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: Colors.surface_container_lowest,
  },
  childItemActive: {
    backgroundColor: Colors.primary_fixed,
    // No harsh borders, using tonal contrast
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.surface_container_low,
    justifyContent: "center",
    marginTop: 8,
  },
  addIconWrapper: {
    marginRight: 8,
  },
});

export default ChildSelectorModal;
