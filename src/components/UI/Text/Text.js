import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { Colors } from "@styles/colors";
import { Fonts } from "@styles/fonts";

export const CustomText = ({ 
  style, 
  variant = "body", 
  weight = "regular", 
  color = Colors.on_surface, 
  align = "left",
  children,
  ...props 
}) => {
  const getFontFamily = () => {
    if (variant === "display") {
      return Fonts.display[weight] || Fonts.display.regular;
    }
    return Fonts.body[weight] || Fonts.body.regular;
  };

  const getFontSize = () => {
    switch (variant) {
      case "display-lg": return 36;
      case "display-md": return 24;
      case "headline": return 20;
      case "body-lg": return 16;
      case "body": return 14;
      case "label": return 12;
      case "label-sm": return 11;
      default: return 14;
    }
  };

  // If variant is generic "body" or "display", we rely on the specific body-lg or display-lg for sizes, otherwise fallback
  let appliedVariant = variant;
  let appliedFamilyVariant = variant;
  
  if (variant.startsWith("display")) {
    appliedFamilyVariant = "display";
  } else if (variant.startsWith("headline")) {
    appliedFamilyVariant = "display";
  } else {
    appliedFamilyVariant = "body";
  }

  const fontFamily = Fonts[appliedFamilyVariant][weight] || Fonts.body.regular;
  const fontSize = getFontSize();

  return (
    <RNText 
      style={[
        { fontFamily, fontSize, color, textAlign: align }, 
        style
      ]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

export default CustomText;
