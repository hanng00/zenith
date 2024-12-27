import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type BottomTabNavigationOptions = {
  color: string;
  focused: boolean;
};

export default function TabLayout() {
  const screens = [
    {
      name: "index",
      options: {
        title: "Home",
        tabBarIcon: ({ color, focused }: BottomTabNavigationOptions) => (
          <Ionicons
            name={focused ? "home-sharp" : "home-outline"}
            color={color}
            size={24}
          />
        ),
      },
    },
    {
      name: "tasks",
      options: {
        title: "Tasks",
        tabBarIcon: ({ color, focused }: BottomTabNavigationOptions) => (
          <Ionicons
            name={focused ? "document" : "document-outline"}
            color={color}
            size={24}
          />
        ),
      },
    },
    {
      name: "about",
      options: {
        title: "About",
        tabBarIcon: ({ color, focused }: BottomTabNavigationOptions) => (
          <Ionicons
            name={focused ? "information-circle" : "information-circle-outline"}
            color={color}
            size={24}
          />
        ),
      },
    },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "hsl(142.1 56.2% 50.3%)",
        headerStyle: {
          backgroundColor: "hsl(0 0% 100%)",
        },
        headerShadowVisible: false,
        headerTintColor: "hsl(240 10% 3.9%)",
        tabBarStyle: {
          backgroundColor: "hsl(0 0% 100%)",
        },
      }}
    >
      {screens.map((screen) => (
        <Tabs.Screen key={screen.name} {...screen} />
      ))}
    </Tabs>
  );
}
