import { createStackNavigator } from "@react-navigation/stack";
import PostsList from "../components/PostsList";
import Post from "../components/Post";

const Stack = createStackNavigator();

export function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Posts"
          component={PostsList}
          options={{
            title: "Posts",
            headerStyle: {
              backgroundColor: "#000",
              borderBottomColor: "#000",
              shadowColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Post}
          options={{
            headerStyle: {
              backgroundColor: "#000",
              borderBottomColor: "#000",
              shadowColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    );
  };