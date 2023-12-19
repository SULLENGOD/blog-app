import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useAuthorName } from "../hooks/useUsers";
import { ActivityIndicator } from "react-native-paper";

export default function PostCard({ post }) {
  const navigation = useNavigation();
  const { title, author, content } = post.item;
  const truncatedContent =
  content && content.length > 60 ? `${content.substring(0, 60)}...` : content;

  const idPost = post.item._id;
  const { authorName, isLoading } = useAuthorName(author);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : author ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Details", { idPost, authorName });
          }}
          style={styles.buttonTrack}
        >
          <View style={styles.cardContainer}>
            <View stylel={styles.infoContainer}>
              <View style={styles.headInfo}>
                <Text style={styles.textTitle}>{title}</Text>
              </View>
              <View>
                <Text style={styles.text}>{truncatedContent}</Text>
              </View>
              <View>
                <Text style={styles.text}>{authorName}</Text>
              </View>
            </View>
          </View>

          <Entypo
            name="text"
            size={24}
            color="white"
            style={styles.playButton}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 1,
    margin: 1,
    gap: 20,
  },
  infoContainer: {
    padding: 1,
    flex: 1,
  },
  textTitle: {
    color: "#fff",
    fontSize: 20,
  },
  headInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  rigthIcon: {
    paddingStart: 100,
    color: "white",
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    margin: 5,
  },
  playButton: {
    alignSelf: "flex-end",

    paddingEnd: 15,
  },
  buttonTrack: {
    backgroundColor: "#000",
    padding: 10,
    width: "100%",
    alignSelf: "center",
  },
});
