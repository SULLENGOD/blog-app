import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const onSignout = async () => {
    await AsyncStorage.removeItem("auth-token");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.button} >
        <Button
          onPress={() => {
            navigation.navigate("New Post");
          }}
          mode="elevated"
          buttonColor="white"
          textColor="black"
        >
          <Text>Create Post</Text>
        </Button>
      </View>
      <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      <View style={styles.button} >
        <Button
        onPress={onSignout}
          mode="elevated"
          buttonColor="white"
          textColor="black"
        >
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center"
  },
  text: {
    alignSelf: "center",
    color: "#fff",
    padding: 10,
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
  }
});
