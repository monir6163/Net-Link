import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootTabParamList } from "./types";

// Screens (Imported from your screens folder)
import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { Colors } from "../Theme/Color";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Settings")
            iconName = focused ? "settings" : "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: { backgroundColor: Colors.tabBar, borderTopWidth: 1 },
        headerTitleStyle: { fontWeight: "bold" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
