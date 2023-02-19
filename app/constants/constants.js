import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Platform, Dimensions, StatusBar } from "react-native";
import { createNavigationContainerRef } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export default {
  //spacing
  xs: 5,
  s: 10,
  m: 20,
  l: 30,
  xl: 40,

  //card-colors
  blue: "#586BA4",
  yellow: "#F5DD90",
  green: "#84DCCF",
  white: "#FFFFFF",
  gray: "#799496",

  //priority-colors
  high: "#F76C5E",
  medium: "#FFA552",
  low: "#B6EEA6",

  //keyboard-behavior
  behavior: Platform.OS === "ios" ? "padding" : "height",

  //font-size
  daygreeting: RFValue(30),
  header: RFValue(15),
  sectionHeader: RFValue(18),
  cardTitle: RFValue(14),
  cardDate: RFValue(12),
  cardPriority: RFValue(12),

  //tab-bar
  HEADER_HEIGHT: Platform.OS === "ios" ? 125 : 70 + StatusBar.currentHeight,

  //add-task
  taskFont: RFValue(12),
};
