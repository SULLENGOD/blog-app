import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import React from "react";
import { usePost } from "../hooks/usePosts";
import { getAuthorName } from "../api/fetchPosts";
import { useAuthorName } from "../hooks/useUsers";

export default function Post({ route }) {
  const id = route.params.idPost;
  const authorName = route.params.authorName;
  const { post, isLoading } = usePost(id);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : post ? (
        <View>
          <Text style={styles.headerText}>{post.title}</Text>
          <View>
            <Text style={styles.contentText}>{post.content}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{authorName}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.error}>No se encontró información del post</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000",
  },
  error: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    padding: 20
  },
  contentText: {
    color: "white",
    fontSize: 15,
    padding: 20,
  },
  authorName: {
    color: "white",
    fontSize: 20,
    alignSelf: "flex-end",
    padding: 20
  },
});
