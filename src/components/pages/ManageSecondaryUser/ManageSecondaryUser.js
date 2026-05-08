import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../UI/Text/Text';
import { Colors } from '../../../styles/colors';

const { width } = Dimensions.get('window');

const SECONDARY_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    relation: 'Spouse',
    access: 'Full Access',
    email: 'sarah.j@example.com',
  },
  {
    id: '2',
    name: 'Robert Smith',
    relation: 'Grandparent',
    access: 'View Only',
    email: 'robert.s@example.com',
  },
];

const ManageSecondaryUserPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.on_surface} />
        </TouchableOpacity>
        <CustomText variant="headline" weight="bold">Family Access</CustomText>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <CustomText variant="body" color={Colors.text.secondary} style={styles.subtitle}>
          Invite family members or caregivers to track progress and contribute to the development journey.
        </CustomText>

        <View style={styles.listContainer}>
          <View style={styles.sectionHeader}>
            <CustomText variant="label-sm" weight="bold" color={Colors.text.light}>TEAM MEMBERS</CustomText>
          </View>

          {SECONDARY_USERS.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userAvatar}>
                <CustomText variant="body-lg" weight="bold" color={Colors.primary}>
                  {user.name.charAt(0)}
                </CustomText>
              </View>
              
              <View style={styles.userInfo}>
                <CustomText variant="body" weight="bold">{user.name}</CustomText>
                <CustomText variant="label-sm" color={Colors.text.secondary}>
                  {user.relation} • {user.access}
                </CustomText>
              </View>

              <TouchableOpacity style={styles.moreBtn}>
                <Ionicons name="ellipsis-vertical" size={20} color={Colors.text.light} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.inviteCard}>
            <View style={styles.inviteIconBox}>
              <Ionicons name="mail-outline" size={24} color={Colors.primary} />
            </View>
            <View style={styles.inviteText}>
              <CustomText variant="body" weight="bold" color={Colors.primary}>Invite Family Member</CustomText>
              <CustomText variant="label-sm" color={Colors.primary} style={{ opacity: 0.7 }}>
                Collaborate on development goals
              </CustomText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoIconBox}>
            <Ionicons name="shield-checkmark-outline" size={22} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomText variant="body-sm" weight="bold">Secure Access</CustomText>
            <CustomText variant="label-sm" color={Colors.text.secondary} style={{ marginTop: 2 }}>
              Only invited members can view child data. You can revoke access at any time.
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  subtitle: {
    marginBottom: 32,
    marginTop: 8,
    lineHeight: 22,
  },
  listContainer: {
    gap: 16,
  },
  sectionHeader: {
    marginBottom: 8,
    paddingLeft: 4,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    backgroundColor: Colors.white,
    shadowColor: Colors.on_surface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  moreBtn: {
    padding: 8,
  },
  inviteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    backgroundColor: Colors.primary + '08',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary + '40',
    marginTop: 8,
  },
  inviteIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inviteText: {
    flex: 1,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: Colors.surface_container_low,
    padding: 20,
    borderRadius: 24,
    marginTop: 40,
    alignItems: 'center',
    gap: 16,
  },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ManageSecondaryUserPage;
