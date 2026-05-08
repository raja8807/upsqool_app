import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import CustomText from '../../../../UI/Text/Text';
import { Colors } from '../../../../../styles/colors';

const { width } = Dimensions.get('window');

const GoalBanner = ({ childName, completedCount = 1, totalCount = 4 }) => {
  const percentage = Math.round((completedCount / totalCount) * 100);
  const displayName = childName ? `${childName}'s` : "Your";
  
  // Progress Circle Config
  const size = 60;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primary, Colors.primary_container]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.progressContainer}>
          <Svg width={size} height={size}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="white"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.percentageWrapper}>
            <CustomText variant="label-sm" weight="bold" color="white">%{percentage}</CustomText>
          </View>
        </View>

        <View style={styles.content}>
          <CustomText variant="body" weight="bold" color="white" style={styles.title}>
            {displayName} daily goals almost done! 🔥
          </CustomText>
          <CustomText variant="label-sm" color="rgba(255, 255, 255, 0.7)">
            {completedCount} of {totalCount} completed
          </CustomText>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gradient: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  progressContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  percentageWrapper: {
    position: 'absolute',
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
});

export default GoalBanner;
