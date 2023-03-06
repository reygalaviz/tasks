import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import HeaderBar from "../components/HeaderBar";

function DeletedTasksScreen({ navigation, ...props }) {
  const onBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <HeaderBar
        back
        header="Deleted Tasks"
        onBackPress={onBackPress}
        style={{}}
      ></HeaderBar>
      <View style={styles.buttons}>
        <Pressable
          onPress={() => console.log(props.tasks)}
          style={{ marginVertical: 50 }}
        >
          <Text>Undo All</Text>
        </Pressable>
        <Pressable>
          <Text>Delete All</Text>
        </Pressable>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default DeletedTasksScreen;
