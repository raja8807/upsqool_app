import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CustomText } from '@components/UI/Text/Text';
import { Colors } from '@styles/colors';

const ToggleCard = ({ title, icon, isSelected, onPress, useCheckStyle = false, subtitle, vertical = false }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.99, { damping: 20 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20 });
  };

  const bgActiveColor = useCheckStyle ? Colors.primary_container : '#1ABC9C';
  const bgColor = isSelected ? bgActiveColor : Colors.surface_container_lowest;
  const textColor = isSelected ? Colors.white : Colors.text.primary;
  const iconColor = isSelected ? bgActiveColor : Colors.primary;
  const iconBg = isSelected ? 'rgba(255,255,255,0.2)' : '#EAF6F2';

  return (
    <Animated.View style={[animatedStyle, { flex: 1, margin: 6 }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, { backgroundColor: bgColor }, vertical && styles.cardVertical, { flex: 1 }]}
      >
        <View style={[styles.content, vertical && styles.contentVertical]}>
          <View style={[styles.iconWrap, { backgroundColor: iconBg, marginBottom: vertical ? 12 : 0 }]}>
            <Ionicons name={icon} size={subtitle ? 24 : 20} color={subtitle ? Colors.white : iconColor} />
          </View>

          <View style={[styles.textWrap, vertical && { alignItems: 'center', flex: 0, marginTop: 12 }]}>
            <CustomText variant="body-lg" weight="bold" color={textColor} align={vertical ? "center" : "left"}>
              {title}
            </CustomText>
            {subtitle && (
              <CustomText variant="label" color={isSelected ? 'rgba(255,255,255,0.8)' : Colors.text.secondary} style={{ marginTop: 2 }} align={vertical ? "center" : "left"}>
                {subtitle}
              </CustomText>
            )}
          </View>

          {useCheckStyle && (
            <View style={[styles.checkWrap, vertical && styles.checkWrapAbsolute]}>
              <Ionicons
                name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                size={22}
                color={isSelected ? Colors.white : Colors.text.light}
              />
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    flexDirection: 'row',
  },
  cardVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  contentVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  checkWrap: {
    marginLeft: 'auto',
  },
  checkWrapAbsolute: {
    position: 'absolute',
    top: -4,
    right: -4,
  }
});

export default ToggleCard;
