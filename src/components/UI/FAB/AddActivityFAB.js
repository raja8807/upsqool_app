import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../styles/colors';

const AddActivityFAB = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.fab}
      onPress={() => navigation.navigate('AddActivityScreen')}
      activeOpacity={0.8}
    >
      <Ionicons name="add" size={28} color={Colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  }
});

export default AddActivityFAB;
