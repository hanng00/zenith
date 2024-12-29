import "@/src/globals.css"; // Import global styles
import { cn } from "@/src/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

type BottomTabNavigationOptions = {
  color: string;
  focused: boolean;
};

export default function TabLayout() {
  const iconSize = 20;
  const screens = [
    {
      name: "index",
      options: {
        title: "Home",
        tabBarIcon: ({ color, focused }: BottomTabNavigationOptions) => (
          <Ionicons
            name={focused ? "home-sharp" : "home-outline"}
            color={color}
            size={iconSize}
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
            size={iconSize}
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
            size={iconSize}
          />
        ),
      },
    },
  ];

  const hsl = (_str: string): string => {
    return `hsl(${_str})`;
  };

  const theme = "dark";

  return (
    <View className={cn("h-full w-full", theme)}>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: hsl("165 27% 13%"),
          },
          headerTintColor: hsl("165 27% 87%"),
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: hsl("165 10% 20%"),
          },
          tabBarActiveTintColor: hsl("165 20% 65%"),
        }}
      >
        {screens.map((screen) => (
          <Tabs.Screen key={screen.name} {...screen} />
        ))}
      </Tabs>
    </View>
  );
}
