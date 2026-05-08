import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../Text/Text';
import { Colors } from '../../../styles/colors';

const { height } = Dimensions.get('window');

const emojis = ['😠', '😐', '🙂', '😄', '🤩'];

const ActivityRatingModal = ({ visible, onClose, onSave }) => {
  const [stars, setStars] = useState(0);
  const [enjoyment, setEnjoyment] = useState(3); // Preselecting '😄' just for aesthetic match initially
  const [note, setNote] = useState('');

  const handleSave = () => {
    onSave && onSave({ stars, enjoyment, note });
    // Reset state after save
    setStars(0);
    setEnjoyment(3);
    setNote('');
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetContainer}
        >
          <TouchableWithoutFeedback>
            <View style={styles.sheetCard}>
              <View style={styles.handle} />

              <CustomText variant="display-sm" weight="bold" align="center" style={styles.mainPrompt}>How was this activity?</CustomText>

              <CustomText variant="label-sm" weight="bold" align="center" style={styles.subtitle}>PERFORMANCE</CustomText>

              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(s => (
                  <TouchableOpacity key={s} onPress={() => setStars(s)}>
                    <Ionicons
                      name="star"
                      size={36}
                      color={s <= stars ? '#F97316' : '#D1D5DB'}
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <CustomText variant="label-sm" weight="bold" align="center" style={styles.subtitle}>ENJOYMENT</CustomText>

              <View style={styles.emojisRow}>
                {emojis.map((emoji, index) => {
                  const isSelected = enjoyment === index;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setEnjoyment(index)}
                      style={[styles.emojiBtn, isSelected && styles.emojiBtnSelected]}
                    >
                      <CustomText variant="display-sm" style={{ fontSize: isSelected ? 32 : 24 }}>{emoji}</CustomText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.noteContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add note..."
                  placeholderTextColor={Colors.text.secondary}
                  value={note}
                  onChangeText={setNote}
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <CustomText variant="body-lg" weight="bold" color={Colors.white}>Save Rating</CustomText>
                <View style={styles.checkIconWrapper}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                </View>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    width: '100%',
  },
  sheetCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 45,
    paddingTop: 16,
    maxHeight: height * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 32,
  },
  mainPrompt: {
    marginBottom: 32,
  },
  subtitle: {
    letterSpacing: 1.5,
    marginBottom: 16,
    color: '#4B5563',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  starIcon: {
    marginHorizontal: 8,
  },
  emojisRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  emojiBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  emojiBtnSelected: {
    backgroundColor: '#FFF7ED', // light peach exactly matching ref
    borderWidth: 2,
    borderColor: '#FFEDD5', // soft orange rim
    transform: [{ scale: 1.15 }],
  },
  noteContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 100,
    fontSize: 16,
    color: Colors.text.primary,
    fontFamily: 'Inter-Regular',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F97316', // Orange Button exactly as specified
    paddingVertical: 18,
    borderRadius: 30,
  },
  checkIconWrapper: {
    marginLeft: 8,
  }
});

export default ActivityRatingModal; 
