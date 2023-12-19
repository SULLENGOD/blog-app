import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useForm } from '../hooks/useForm';
import { createPost } from "../api/fetchPosts";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPost = () => {
    const {title, content, onInputChange, resetForm} = useForm({
        title: "",
        content: ""
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        if(title.length && content.length <= 1) return;

        const auth = await AsyncStorage.getItem("auth-token");

        const post = {
            title: title,
            content: content
        };

        try{
            const res = await createPost(post, auth);

            if (!res.ok) {
                console.log("Something went wrong, please try again");
            } else {
                alert("Successful!")
                resetForm();
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    }
  return (
    <View style={styles.conatiner}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={(text) => onInputChange("title", text)}
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
          label="Content"
          value={content}
          onChangeText={(text) => onInputChange("content", text)}
          mode="outlined"
          style={styles.input}
          outlineColor="white"
          activeOutlineColor="white"
          selectionColor="white"
          textColor="white"
          multiline={true}
        />
      </View>
      <View style={styles.button}>
          <Button
            mode="outlined"
            onPress={onSubmit}
            buttonColor="black"
            textColor="white"
          >
            <Text>Post</Text>
          </Button>
        </View>
    </View>
  )
}

export default NewPost;

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
      backgroundColor:"#000"
    }
  });