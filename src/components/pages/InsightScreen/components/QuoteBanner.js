import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';

const QuoteBanner = () => {
  return (
    <View style={styles.bannerWrapper}>
      <View style={styles.mockIllustrationWash} />
      
      <CustomText variant="body" weight="bold" color={Colors.white} style={styles.quoteText}>
        "Small steps everyday create the strongest foundations."
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerWrapper: {
    backgroundColor: '#0F2F32', 
    borderRadius: 32,
    padding: 32,
    paddingTop: 80,
    marginBottom: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  mockIllustrationWash: {
    position: 'absolute',
    top: -60,
    left: '25%',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1E494C',
    opacity: 0.8,
  },
  quoteText: {
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },
});

export default QuoteBanner;
