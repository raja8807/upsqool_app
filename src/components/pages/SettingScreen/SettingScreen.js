import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@styles/colors';
import { CustomText } from '@components/UI/Text/Text';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';

// ─── Animated Setting Row ───────────────────────────────────────────────────
const SettingRow = ({
  icon,
  iconBg,
  label,
  sublabel,
  onPress,
  rightElement,
  isLast = false,
  isDarkMode,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) scale.value = withSpring(0.97, { damping: 15 });
  };

  const handlePressOut = () => {
    if (onPress) scale.value = withSpring(1, { damping: 15 });
  };

  const textColor = isDarkMode ? Colors.text.white : Colors.text.primary;
  const subtextColor = isDarkMode ? Colors.text.light : Colors.text.secondary;
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : Colors.outline_variant;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.row}
      >
        <View style={[styles.rowIconWrap, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={20} color={isDarkMode ? Colors.white : Colors.primary} />
        </View>

        <View style={styles.rowBody}>
          <CustomText variant="body-lg" weight="semiBold" color={textColor}>
            {label}
          </CustomText>
          {sublabel ? (
            <CustomText variant="label" color={subtextColor} style={{ marginTop: 2 }}>
              {sublabel}
            </CustomText>
          ) : null}
        </View>

        {rightElement ??
          (onPress ? (
            <Ionicons name="chevron-forward" size={20} color={subtextColor} />
          ) : null)}
      </Pressable>
    </Animated.View>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const SettingScreenPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { session, logout, userProfile } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const userEmail = session?.user?.email ?? userProfile?.email ?? 'user@upSqool.app';
  const displayName = userProfile?.firstName ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : userEmail.split('@')[0];

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ],
      { cancelable: true }
    );
  };

  // Dynamic colors for dark mode context
  const bgColor = isDarkMode ? '#121212' : Colors.surface;
  const cardColor = isDarkMode ? '#1E1E1E' : Colors.surface_container_lowest;
  const headerColor = isDarkMode ? Colors.white : Colors.text.primary;
  const sectionTitleColor = isDarkMode ? Colors.text.light : Colors.text.secondary;
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : Colors.border;

  return (
    <View style={[styles.container, { backgroundColor: bgColor, paddingTop: insets.top }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <CustomText variant="headline" weight="bold" color={headerColor}>
          Settings
        </CustomText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* ── Profile Card ── */}
        {/* <Pressable onPress={() => navigation?.navigate('UserOnBoarding')}>
          <LinearGradient
            colors={isDarkMode ? ['#1A3D36', '#265C50'] : [Colors.primary, Colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            <View style={styles.avatarWrap}>
              <CustomText variant="display-md" weight="bold" color={Colors.white}>
                {displayName.charAt(0).toUpperCase()}
              </CustomText>
            </View>
            <View style={{ flex: 1 }}>
              <CustomText variant="headline" weight="bold" color={Colors.white}>
                {displayName}
              </CustomText>
              <CustomText variant="body" color="rgba(255,255,255,0.8)" style={{ marginTop: 2 }}>
                {userEmail}
              </CustomText>
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={16} color={isDarkMode ? Colors.primary_container : Colors.primary} />
            </View>
          </LinearGradient>
        </Pressable> */}

        {/* ── Family Section ── */}
        <View style={styles.section}>
          <CustomText variant="label" weight="semiBold" color={sectionTitleColor} style={styles.sectionTitle}>
            FAMILY MANAGEMENT
          </CustomText>
          <View style={[styles.sectionCard, { backgroundColor: cardColor, borderColor }]}>
            <SettingRow
              icon="people"
              iconBg={isDarkMode ? 'rgba(26,188,156,0.15)' : '#EAF6F2'}
              label="Manage Children"
              sublabel="View and edit child profiles"
              onPress={() => navigation?.navigate('ListOfChildren')}
              isDarkMode={isDarkMode}
            />
            <SettingRow
              icon="person-add"
              iconBg={isDarkMode ? 'rgba(26,188,156,0.15)' : '#EAF6F2'}
              label="Add Secondary User"
              sublabel="Invite a co-parent or caregiver"
              onPress={() => navigation?.navigate('ManageSecondaryUser')}
              isLast
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        {/* ── Preferences Section ── */}
        <View style={styles.section}>
          <CustomText variant="label" weight="semiBold" color={sectionTitleColor} style={styles.sectionTitle}>
            APP PREFERENCES
          </CustomText>
          <View style={[styles.sectionCard, { backgroundColor: cardColor, borderColor }]}>
            <SettingRow
              icon={isDarkMode ? "moon" : "sunny"}
              iconBg={isDarkMode ? 'rgba(139,92,246,0.2)' : '#EDE9FE'}
              label="Dark Mode"
              sublabel={isDarkMode ? 'Appearance is set to dark' : 'Appearance is set to light'}
              isDarkMode={isDarkMode}
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  trackColor={{ false: Colors.surface_container_highest, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              }
            />
            <SettingRow
              icon="notifications"
              iconBg={isDarkMode ? 'rgba(245,158,11,0.2)' : '#FEF3C7'}
              label="Notifications"
              sublabel={notificationsEnabled ? 'Push notifications enabled' : 'Push notifications disabled'}
              isLast
              isDarkMode={isDarkMode}
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: Colors.surface_container_highest, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              }
            />
          </View>
        </View>

        {/* ── Security Section ── */}
        <View style={styles.section}>
          <CustomText variant="label" weight="semiBold" color={sectionTitleColor} style={styles.sectionTitle}>
            SECURITY
          </CustomText>
          <View style={[styles.sectionCard, { backgroundColor: cardColor, borderColor }]}>
            <SettingRow
              icon="lock-closed"
              iconBg={isDarkMode ? 'rgba(239,68,68,0.15)' : '#FEE2E2'}
              label="Change Password"
              sublabel="Update your account password"
              onPress={() => navigation?.navigate('ChangePassword')}
              isLast
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        {/* ── About Section ── */}
        <View style={styles.section}>
          <CustomText variant="label" weight="semiBold" color={sectionTitleColor} style={styles.sectionTitle}>
            ABOUT
          </CustomText>
          <View style={[styles.sectionCard, { backgroundColor: cardColor, borderColor }]}>
            <SettingRow
              icon="information-circle"
              iconBg={isDarkMode ? 'rgba(56,189,248,0.15)' : '#E0F2FE'}
              label="App Version"
              sublabel="v1.0.0 (Build 34)"
              isLast
              isDarkMode={isDarkMode}
            />
          </View>
        </View>

        {/* ── Sign Out ── */}
        <Pressable onPress={handleLogout} style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}>
          <Ionicons name="log-out-outline" size={22} color={Colors.error} style={{ marginRight: 10 }} />
          <CustomText variant="body-lg" weight="bold" color={Colors.error}>
            Sign Out
          </CustomText>
        </Pressable>

        <View style={{ height: insets.bottom + 40 }} />
      </ScrollView>
    </View>
  );
};

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  content: {
    paddingHorizontal: 16,
  },

  // Profile card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 22,
    marginBottom: 28,
    gap: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    // elevation: 8,
  },
  avatarWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 8,
    opacity: 0.8,
  },
  sectionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    // elevation: 2,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 16,
  },
  rowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBody: {
    flex: 1,
  },

  // Logout
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: 20,
    paddingVertical: 18,
    marginTop: 8,
  },
});

export default SettingScreenPage;
