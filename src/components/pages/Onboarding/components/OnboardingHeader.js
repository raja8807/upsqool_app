import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CustomText } from '@components/UI/Text/Text';
import { Colors } from '@styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingHeader = ({ step, totalSteps, title, subtitle, onBack, rightText }) => {
  const insets = useSafeAreaInsets();
  const progressPercent = (step / totalSteps) * 100;
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progressPercent, { duration: 500 });
  }, [progressPercent]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      {/* Top Nav Row */}
      <View style={styles.navRow}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        
        {rightText ? (
           <CustomText variant="headline" weight="bold" color={Colors.primary}>
             {rightText}
           </CustomText>
        ) : (
           <CustomText variant="headline" weight="bold" color={Colors.primary}>
             Profile Setup
           </CustomText>
        )}
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Bar Container */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <CustomText variant="label-sm" weight="semiBold" color={Colors.text.secondary}>
            {`STEP ${step} OF ${totalSteps}`}
          </CustomText>
          <CustomText variant="label-sm" weight="bold" color={Colors.primary}>
            {`${Math.round(progressPercent)}% Complete`}
          </CustomText>
        </View>
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, animatedProgressStyle]} />
        </View>
      </View>

      {/* Title & Subtitle */}
      {title && (
         <View style={styles.titleSection}>
           <CustomText variant="display-md" weight="bold" color={Colors.text.primary} style={{ marginBottom: 8, letterSpacing: -0.5 }}>
             {title}
           </CustomText>
           {subtitle && (
             <CustomText variant="body-lg" color={Colors.text.secondary} style={{ lineHeight: 24 }}>
               {subtitle}
             </CustomText>
           )}
         </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: Colors.surface,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    padding: 4,
    marginLeft: -4,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surface_container_highest,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary_container,
    borderRadius: 3,
  },
  titleSection: {
    marginBottom: 16,
  }
});

export default OnboardingHeader;
