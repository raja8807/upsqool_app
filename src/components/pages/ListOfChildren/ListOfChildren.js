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
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');

const ListOfChildrenPage = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { children, activeChildId, switchChild } = useAuth();

  const handleSelectChild = (id) => {
    switchChild(id);
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.on_surface} />
        </TouchableOpacity>
        <CustomText variant="headline" weight="bold">My Family</CustomText>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <CustomText variant="body" color={Colors.text.secondary} style={styles.subtitle}>
          Switch between profiles or manage individual settings for each child.
        </CustomText>

        <View style={styles.listContainer}>
          {children.map((child) => {
            const isActive = child.id === activeChildId;
            return (
              <TouchableOpacity
                key={child.id}
                style={[styles.childCard, isActive && styles.activeCard]}
                onPress={() => handleSelectChild(child.id)}
              >
                <View style={[styles.avatarWrapper, { backgroundColor: isActive ? Colors.primary : Colors.surface_container_low }]}>
                  <Ionicons 
                    name="person" 
                    size={28} 
                    color={isActive ? Colors.white : Colors.primary} 
                  />
                </View>
                
                <View style={styles.childInfo}>
                  <CustomText variant="body-lg" weight="bold">
                    {child.first_name} {child.last_name}
                  </CustomText>
                  <CustomText variant="label-sm" color={Colors.text.secondary}>
                    {child.age || '5'} years old • {child.gender || 'Male'}
                  </CustomText>
                </View>

                {isActive ? (
                  <View style={styles.activeBadge}>
                    <CustomText variant="label-xs" weight="bold" color={Colors.white}>ACTIVE</CustomText>
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={Colors.surface_container_highest} />
                )}
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity 
            style={styles.addCard}
            onPress={() => navigation.navigate('ChildrenOnBoarding')}
          >
            <View style={styles.addIconBox}>
              <Ionicons name="add" size={28} color={Colors.primary} />
            </View>
            <CustomText variant="body-lg" weight="bold" color={Colors.primary}>
              Add Another Child
            </CustomText>
          </TouchableOpacity>
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
  childCard: {
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
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeCard: {
    borderColor: Colors.primary + '30',
    backgroundColor: Colors.primary + '05',
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.surface_container_highest,
    marginTop: 8,
    justifyContent: 'center',
    gap: 12,
  },
  addIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListOfChildrenPage;
