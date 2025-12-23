import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Colors } from "../Theme/Color";

import ProfileScreen from "../Screens/ProfileScreen";
import { TabNavigator } from "./TabNavigator";
import { RootDrawerParamList } from "./types";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      {/* The TabNavigator is nested here */}
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ title: "Dashboard" }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
