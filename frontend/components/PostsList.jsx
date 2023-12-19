import React, { useState, useCallback } from "react";
import { View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import { usePosts } from "../hooks/usePosts";
import PostCard from "./PostCard";

export default function PostsList() {
  const { posts, isLoading, refreshPosts } = usePosts();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshPosts();
    setIsRefreshing(false);
  }, [refreshPosts]);

  const renderPostCard = (item) => <PostCard post={item} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostCard}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
