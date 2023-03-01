// import React, { useState, useContext, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   useWindowDimensions,
//   Dimensions,
// } from "react-native";
// import constants from "../constants/constants";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import Checkmark from "./Checkmark";
// import Priority from "./Priority";
// import Animated, {
//   runOnJS,
//   SlideInLeft,
//   SlideOutLeft,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSequence,
//   withSpring,
//   withTiming,
//   Easing,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import themeContext from "../theme/themeContext";
// import Swipeable from "react-native-gesture-handler/Swipeable";
// const translateX = useSharedValue(0);
// const taskHeight = useSharedValue(constants.cardHeight);
// const marginVertical = useSharedValue(10);
// const opacity = useSharedValue(1);

// const screen_width = useWindowDimensions().width;
// const translate_x_threshold = -screen_width * 0.35;

// const gestureHandler = useAnimatedGestureHandler({
//   onStart: (_, ctx) => {
//     ctx.startX = translateX.value;
//   },
//   onActive: (event) => {
//     translateX.value = event.translationX;
//   },
//   onEnd: () => {
//     const hold = translateX.value < translate_x_threshold;

//     if (hold) {
//       translateX.value = withSequence(
//         withTiming(translate_x_threshold),
//         withSpring(translate_x_threshold)
//       );
//       taskHeight.value = withTiming(
//         translate_x_threshold,
//         undefined,
//         (isFinished) => {
//           if (isFinished && deleteTask) {
//             runOnJS(deleteTask)(task);
//           }
//         }
//       );
//     } else {
//       translateX.value = withTiming(0);
//     }
//   },
// });

// const animatedStyle = useAnimatedStyle(() => ({
//   transform: [
//     {
//       translateX: translateX.value,
//     },
//   ],
// }));

// const animatedIconContainerStyle = useAnimatedStyle(() => {
//   const opacity = withTiming(
//     translateX.value < -screen_width * 0.1
//       ? 1
//       : 0.5 || translateX.value > 0
//       ? 0
//       : 0
//   );
//   return { opacity };
// });

// const animatedTaskContainerStyle = useAnimatedStyle(() => {
//   return {
//     // height: taskHeight.value,
//     // marginVertical: marginVertical.value,
//     // opacity: opacity.value,
//   };
// });

// const Card = () => {
//   return (
//     <PanGestureHandler
//       failOffsetY={[-5, 5]}
//       activeOffsetX={[-5, 5]}
//       onGestureEvent={gestureHandler}
//     >
//       <Animated.View>
//         <Animated.View
//           style={[styles.iconContainer, animatedIconContainerStyle]}
//         >
//           <Ionicons
//             name="trash-outline"
//             size={constants.cardHeight * 0.25}
//             color="black"
//           />
//         </Animated.View>

//         <Animated.View
//           style={[animatedTaskContainerStyle, styles.taskContainer, {}]}
//         >
//           <Animated.View
//             style={[
//               animatedStyle,
//               styles.task,
//               { backgroundColor: task.color },
//             ]}
//           >
//             <View style={styles.titleContainer}>
//               <Text style={[styles.title]} numberOfLines={3}>
//                 {task.name}
//               </Text>

//               <BouncyCheckbox
//                 useNativeDriver={true}
//                 size={35}
//                 style={{ alignSelf: "flex-start" }}
//                 fillColor="##5CFF5C"
//                 unfillColor="#A3EBB1"
//                 iconStyle={{ borderColor: "black" }}
//                 innerIconStyle={{
//                   borderWidth: 1,
//                   borderColor: "black",
//                 }}
//                 onPress={handleCheckbox}
//               />
//             </View>

//             <View>
//               <View style={styles.dateContainer}>
//                 <MaterialIcons name="calendar-today" size={20} color="black" />
//                 <Text style={styles.date}>{task.date}</Text>
//               </View>
//               <View style={styles.timeContainer}>
//                 <View style={{ flexDirection: "row" }}>
//                   <MaterialIcons name="access-time" size={20} color="black" />
//                   <Text style={styles.date}>{task.time}</Text>
//                 </View>
//                 <Priority priorityTitle={task.priority} />
//               </View>
//             </View>
//           </Animated.View>
//         </Animated.View>
//       </Animated.View>
//     </PanGestureHandler>
//   );
// };
