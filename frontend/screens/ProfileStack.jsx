import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login";
import Profile from '../components/Profile'
import NewUser from "../components/NewUser";
import NewPost from "../components/NewPost";

const Stack = createStackNavigator();

export function ProfileStack() {
    return (
      <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "My Profile",
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
            name="User"
            component={Profile}
            options={{
              headerLeft: (props) => null,
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
          name="New User"
          component={NewUser}
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
        <Stack.Screen
          name="New Post"
          component={NewPost}
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
  }
  