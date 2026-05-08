import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../UI/Text/Text';
import CustomInput from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { Colors } from '../../../styles/colors';

const ChangePasswordPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdate = async () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Your password has been updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.on_surface} />
        </TouchableOpacity>
        <CustomText variant="headline" weight="bold">Security</CustomText>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconHeader}>
          <View style={styles.lockCircle}>
            <Ionicons name="shield-lock" size={40} color={Colors.primary} />
          </View>
          <CustomText variant="headline-sm" weight="bold" style={styles.title}>Update Password</CustomText>
          <CustomText variant="body" color={Colors.text.secondary} style={styles.subtitle}>
            Choose a strong password to keep your family's data safe and secure.
          </CustomText>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="CURRENT PASSWORD"
            placeholder="Enter current password"
            value={form.currentPassword}
            onChangeText={(v) => setForm({ ...form, currentPassword: v })}
            secureTextEntry
            icon="lock-closed-outline"
          />

          <View style={{ height: 16 }} />

          <CustomInput
            label="NEW PASSWORD"
            placeholder="Enter new password"
            value={form.newPassword}
            onChangeText={(v) => setForm({ ...form, newPassword: v })}
            secureTextEntry
            icon="key-outline"
          />

          <View style={{ height: 16 }} />

          <CustomInput
            label="CONFIRM NEW PASSWORD"
            placeholder="Repeat new password"
            value={form.confirmPassword}
            onChangeText={(v) => setForm({ ...form, confirmPassword: v })}
            secureTextEntry
            icon="checkmark-circle-outline"
          />

          <View style={styles.requirements}>
            <CustomText variant="label-sm" color={Colors.text.light} style={{ marginBottom: 8 }}>
              PASSWORD REQUIREMENTS:
            </CustomText>
            <View style={styles.requirementItem}>
              <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginLeft: 8 }}>
                Minimum 8 characters
              </CustomText>
            </View>
            <View style={styles.requirementItem}>
              <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
              <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginLeft: 8 }}>
                Include at least one number
              </CustomText>
            </View>
          </View>

          <View style={{ height: 40 }} />

          <Button 
            title="Update Password" 
            variant="primary" 
            onPress={handleUpdate}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: Colors.white,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  lockCircle: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  requirements: {
    marginTop: 24,
    backgroundColor: Colors.surface_container_low,
    padding: 16,
    borderRadius: 20,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  }
});

export default ChangePasswordPage;
