import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "../hooks/useForm";
import { signin } from "../api/fetchUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email.length && password.length <= 1) return;

    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await signin(user);

      if (!res.ok) {
        console.log("Something went wrong, please try again");
      } else {
        console.log("Successful");
        const authToken = res.headers.get("auth-token");
        await AsyncStorage.setItem("auth-token", authToken);
        navigation.navigate("User")

      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  // try {
  //   const res = await signup(newUser);
    
  //   if (!res.ok) {
  //     console.log("Something went wrong, please try again");
  //   } else {
  //     alert("Successful")
  //   }
  // } catch (error) {
  //   console.error("Error during signup: ", error);
  // };

  return (
    <View style={styles.conatiner}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => onInputChange("email", text)}
            mode="outlined"
            style={styles.input}
            outlineColor="white"
            activeOutlineColor="white"
            selectionColor="white"
            textColor="white"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            style={styles.input}
            value={password}
            onChangeText={(text) => onInputChange("password", text)}
            mode="outlined"
            outlineColor="white"
            activeOutlineColor="white"
            selectionColor="white"
            textColor="white"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={onSubmit}
            mode="outlined"
            buttonColor="black"
            textColor="white"
          >
            <Text>Login to create posts</Text>
          </Button>
        </View>
        <View
          style={{
            borderBottomColor: "white",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={styles.button}>
          <Button
            onPress={() => {
              navigation.navigate("New User");
            }}
            mode="outlined"
            buttonColor="white"
            textColor="black"
          >
            <Text>Create user</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    padding: 5,
  },
  formContainer: {
    justifyContent: "center",
  },
  button: {
    marginTop: 25,
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#000",
  },
});
