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
  xs: moderateScale(5),
  s: moderateScale(10),
  m: moderateScale(20),
  l: moderateScale(30),
  xl: moderateScale(40),

  //card-colors
  blue: "#586BA4",
  yellow: "#F5DD90",
  green: "#84DCCF",
  white: "#FFFFFF",
  gray: "#799496",

  //search-bar
  searchFontSize: RFValue(13),

  //priority-colors
  high: "#F76C5E",
  medium: "#FFA552",
  low: "#B6EEA6",

  //keyboard-behavior
  behavior: Platform.OS === "ios" ? "padding" : "height",

  //font-size
  daygreeting: RFValue(30),
  header: RFValue(15),
  screenHeader: RFValue(20),
  sectionHeader: RFValue(13),
  sectionItem: RFValue(12),

  //header-bar
  marginTopHeader:
    Platform.OS === "ios" ? verticalScale(60) : 10 + StatusBar.currentHeight,
  startHeaderHeight:
    Platform.OS === "ios" ? verticalScale(160) : 10 + StatusBar.currentHeight,
  endHeaderHeight:
    Platform.OS === "ios" ? verticalScale(100) : 10 + StatusBar.currentHeight,

  //text-input
  titleMaxHeight: verticalScale(100),
  titleMinHeight: verticalScale(20),
  detailsMaxHeight: "100%",
  detailsMinHeight: verticalScale(20),
  inputPaddingVertical: verticalScale(15),
  inputPaddingHor: horizontalScale(20),

  //add-task
  taskFont: RFValue(14),
  taskDetailsFont: RFValue(12),
  taskFontDateTime: RFValue(12),
  errorFontSize: RFValue(11),
  buttonsHeight: verticalScale(50),
  buttonTextSize: RFValue(13),

  //task-card
  cardTitle: RFValue(12),
  cardDate: RFValue(12),
  cardPriority: RFValue(12),
  cardHeight: 140,
  iconSize: verticalScale(20),

  //completed-task-card
  deletedCardHeight: verticalScale(115),

  //modal-sheet-top-padding
  sheetTopPadding:
    Platform.OS === "ios" ? moderateScale(50) : moderateScale(10),

  //tab-bar
  tabWidth: moderateScale(100),
  tabHeight: moderateScale(40),
  tabText: RFValue(12),
  iconTabSizeW: horizontalScale(20),
  iconTabSizeH: verticalScale(20),

  //pop-up-window
  modalWidth: width,
  modalHeight: height * 0.25,

  //no-tasks display
  noTasksHeight: height * 0.4,
  noTaskFontSize: RFValue(15),
  noTaskSubFontSize: RFValue(13),

  //filters
  filterButtonsHeight: verticalScale(50),
  filterModalHeight: verticalScale(600),
  filterTabHeight: moderateScale(40),

  //color-bar
  circleSize: moderateScale(35),
  circleRing: moderateScale(2),
  spaceBetween: moderateScale(2),

  //animated-header
  headerHeight: moderateScale(400),
  flatListPaddingTop: moderateScale(410),
};
