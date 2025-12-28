import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { RootTabParamList } from "./types";

// Screens
import HomeScreen from "../Screens/HomeScreen";
import PackageListScreen from "../Screens/PackageListScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import { Colors } from "../Theme/Color";

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 90 : 70, // কৃষকদের জন্য বড় এবং পরিষ্কার বাটন
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "হোম",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "সেটিংস",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "প্রোফাইল",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* PackageList পুরোপুরি লুকানো থাকবে */}
      <Tab.Screen
        name="PackageList"
        component={PackageListScreen}
        options={{
          tabBarItemStyle: { display: "none" }, // এটি ট্যাব বার থেকে আইটেমটি সরিয়ে ফেলবে
          tabBarStyle: { display: "none" }, // এই স্ক্রিনে গেলে ট্যাব বার দেখাবে না
        }}
      />
    </Tab.Navigator>
  );
};
