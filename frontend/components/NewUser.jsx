import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useForm } from "../hooks/useForm";
import { signup } from "../api/fetchUsers";

const NewUser = () => {
  const { username, email, password, onInputChange, resetForm } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (email.length && password.length <= 1) return;

    const newUser = {
      email: email,
      password: password,
      username: username,
    };

    try {
      const res = await signup(newUser);

      if (!res.ok) {
        console.log("Something went wrong, please try again");
      } else {
        alert("Successful");
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.inputContainer}>
        <TextInput
          label="username"
          value={username}
          onChangeText={(text) => onInputChange("username", text)}
          style={styles.input}
          mode="outlined"
          outlineColor="white"
          activeOutlineColor="white"
          selectionColor="white"
          textColor="white"
        />
      </View>
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
          value={password}
          onChangeText={(text) => onInputChange("password", text)}
          mode="outlined"
          ç
          style={styles.input}
          outlineColor="white"
          activeOutlineColor="white"
          selectionColor="white"
          textColor="white"
        />
      </View>
      <View style={styles.button}>
        <Button
          onPress={onSubmit}
          mode="elevated"
          buttonColor="white"
          textColor="black"
        >
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
};

export default NewUser;

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
