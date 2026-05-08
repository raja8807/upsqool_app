import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../../UI/Text/Text';
import { Colors } from '../../../../styles/colors';
import Svg, { Circle } from 'react-native-svg';
import { useDataContext } from '../../../../context/DataContext';
import { calculateQDistribution } from '../../../../utils/dataCalculations';

const QDistributionCard = () => {
  const { activities } = useDataContext();
  const distribution = calculateQDistribution(activities);

  const radius = 60;
  const strokeW = 16;
  const circumference = 2 * Math.PI * radius;
  const size = (radius + strokeW) * 2;

  const totalQValue = Object.values(distribution).reduce((a, b) => a + b, 0);

  const ringSegments = [
    { name: 'Intelligence', color: '#0F766E', val: distribution.Intelligence },
    { name: 'Emotional', color: '#D97706', val: distribution.Emotional },
    { name: 'Creative', color: '#14B8A6', val: distribution.Creative },
    { name: 'Physical', color: '#A7F3D0', val: distribution.Physical },
    { name: 'Values', color: '#E5E7EB', val: distribution.Values },
  ];

  // Map to segments for rendering (normalized to 100% total for the donut)
  const normalizedSegments = ringSegments.map(s => ({
    ...s,
    pct: totalQValue > 0 ? s.val / totalQValue : 0.2 // Default fallback
  }));

  let cumulativePct = 0;
  const renderedCircles = normalizedSegments.map((seg, index) => {
    const dashOffset = circumference - (seg.pct * circumference);
    const rotation = cumulativePct * 360 - 90;
    cumulativePct += seg.pct;

    if (seg.pct === 0) return null;

    return (
      <Circle
        key={index}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={seg.color}
        strokeWidth={strokeW}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        fill="transparent"
        rotation={rotation}
        origin={`${size / 2}, ${size / 2}`}
        strokeLinecap="butt"
      />
    );
  }).filter(Boolean);

  return (
    <View style={styles.container}>
      <CustomText variant="label-sm" weight="bold" style={styles.sectionTitle}>
        Q DISTRIBUTION
      </CustomText>

      <View style={styles.cardWrapper}>
        <View style={styles.donutContainer}>
          <Svg width={size} height={size}>
            {renderedCircles}
          </Svg>
          <View style={styles.donutCenterLabel}>
            <CustomText variant="display" weight="bold" color={Colors.text.primary}>{Math.round(totalQValue)}</CustomText>
            <CustomText variant="label-sm" weight="bold" color={Colors.text.secondary} style={{ letterSpacing: 1, marginTop: 4, fontSize: 10 }}>TOTAL Q</CustomText>
          </View>
        </View>

        <View style={styles.legendGrid}>
          {/* Column 1 */}
          <View style={styles.legendCol}>
            <View style={styles.legendRow}><View style={[styles.dot, { backgroundColor: '#0F766E' }]} /><CustomText variant="label-sm">Intelligence</CustomText></View>
            <View style={styles.legendRow}><View style={[styles.dot, { backgroundColor: '#14B8A6' }]} /><CustomText variant="label-sm">Creative</CustomText></View>
            <View style={styles.legendRow}><View style={[styles.dot, { backgroundColor: '#E5E7EB' }]} /><CustomText variant="label-sm">Values</CustomText></View>
          </View>
          {/* Column 2 */}
          <View style={styles.legendCol}>
            <View style={styles.legendRow}><View style={[styles.dot, { backgroundColor: '#D97706' }]} /><CustomText variant="label-sm">Emotional</CustomText></View>
            <View style={styles.legendRow}><View style={[styles.dot, { backgroundColor: '#A7F3D0' }]} /><CustomText variant="label-sm">Physical</CustomText></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  sectionTitle: {
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 8,
  },
  cardWrapper: {
    backgroundColor: '#F3F4F6', // Extra soft gray styling strictly to design spec
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  donutContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  donutCenterLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  legendCol: {
    flex: 1,
    gap: 12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
});

export default QDistributionCard;
