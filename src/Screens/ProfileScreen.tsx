import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../Context/AuthContext";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    alert("Logged out successfully");
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-blue-700 p-4 rounded-lg m-4"
      >
        <Text className="text-white text-center font-bold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
