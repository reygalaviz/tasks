import React, { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import constants from "../constants/constants";

const tabs = ["Today", "Upcoming", "Completed"];

function TabBar(props) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: constants.m,
        marginTop: constants.m,
        marginBottom: constants.s,
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Pressable onPress={() => setSelectedTab(tab)} key={index}>
            <View
              style={[
                styles.container,
                {
                  backgroundColor:
                    selectedTab === tab ? "black" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  { color: selectedTab === tab ? "white" : "black" },
                ]}
              >
                {tab}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: constants.s,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: constants.tabWidth,
    height: constants.tabHeight,
  },
  text: {
    fontWeight: "700",
    fontSize: constants.tabText,
  },
});

export default TabBar;
