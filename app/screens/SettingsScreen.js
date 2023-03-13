import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Switch,
  ScrollView,
  Pressable,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "../theme/themeContext";
import ModalSheet from "../components/ModalSheet";
import constants from "../constants/constants";
import { Portal, PortalHost } from "@gorhom/portal";
import ModalSheetHeader from "../components/ModalSheetHeader";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function SettingsScreen({ isOpen, setIsOpen, sheetRef }) {
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const snapPoints = ["100%"];

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(!isOpen);
  }, []);

  const onCancelPress = () => {
    sheetRef?.current?.close();
  };

  const sections = [
    {
      header: "Preferences",
      items: [
        { id: "darkMode", label: "Dark Mode", type: "toggle" },
        { id: "deletedTask", label: "Deleted Tasks", type: "select" },
      ],
    },
    {
      header: "Help",
      items: [
        { id: "bug", label: "Report Bug", type: "link" },
        { id: "contact", label: "Contact Us", type: "link" },
      ],
    },
  ];
  const [form, setForm] = useState({
    darkMode: false,
  });

  return (
    <ModalSheet
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      index={-1}
      onChange={handleSnapPress}
      style={{ backgroundColor: theme.background }}
    >
      <ModalSheetHeader
        title="Settings"
        onPress={onCancelPress}
        cancel
        iconColor={theme.color}
        style={{ color: theme.color }}
      />

      <BottomSheetScrollView style={{}}>
        {sections.map(({ header, items }) => (
          <View key={header} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>

            {items.map(({ label, id, type }, index) => (
              <View
                style={[
                  styles.rowWrapper,
                  // index === 0 && { borderTopWidth: 0 },
                ]}
                key={id}
              >
                <Pressable
                  onPress={() => {
                    {
                      id === "deletedTask" &&
                        navigation.navigate("DeletedTasksScreen");
                    }
                  }}
                >
                  <View style={styles.row}>
                    <Text style={[styles.rowLabel, { color: theme.color }]}>
                      {label}
                    </Text>
                    <View style={styles.rowSpacer} />
                    {/* {type === "select" && <Text>{form[id]}</Text>} */}
                    {["select", "link"].includes(type) && (
                      <Feather name="chevron-right" size={24} color="#ababab" />
                    )}
                    {type === "toggle" && (
                      <Switch
                        value={form[id]}
                        onValueChange={(value) => {
                          setForm({ ...form, [id]: value });

                          {
                            id === "darkMode" &&
                              EventRegister.emit("changeTheme", value);
                          }
                        }}
                        style={{
                          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
                        }}
                      />
                    )}
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </BottomSheetScrollView>
    </ModalSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: constants.m,
    marginTop: constants.sheetTopPadding,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: constants.l,
  },
  headerText: {
    fontSize: constants.screenHeader,
    fontWeight: "bold",
  },
  themeContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeText: {
    fontSize: constants.sectionHeader,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: constants.m,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: constants.sectionHeader,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  rowWrapper: {
    paddingLeft: constants.m,
    // borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  row: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
  },
  rowLabel: {
    fontSize: constants.sectionItem,
    fontWeight: "500",
  },
  rowSpacer: {
    flex: 1,
  },
});

export default SettingsScreen;
