import { createStackNavigator } from "@react-navigation/stack";
import Search from "../components/Search";

const Stack = createStackNavigator();

export function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
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
