import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const InsightHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <CustomText variant="display" weight="bold" style={styles.title}>Insights</CustomText>
      <CustomText variant="body-lg" color={Colors.text.secondary} style={styles.subtitle}>
        Nurturing your child's multi-dimensional growth.
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    lineHeight: 22,
  },
});

export default InsightHeader;
