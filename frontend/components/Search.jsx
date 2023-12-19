import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useForm } from "../hooks/useForm";
import { useSearchPosts } from "../hooks/usePosts";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";

const Search = () => {
  const { query, onInputChange } = useForm({
    query: "",
  });

  const { posts, isLoading } = useSearchPosts(query);

  const renderPostCard = (item) => <PostCard post={item} />;

  return (
    <View style={styles.container} >
      <Searchbar
        placeholder="Search"
        style={styles.input}
        onChangeText={(text) => onInputChange("query", text)}
        value={query}
        placeholderTextColor="#464646"
      />
      {query == "" ? (
        <></>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostCard}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Search;


const  styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000",
        padding: 20
    },
    input: {
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#fff"
    }
})