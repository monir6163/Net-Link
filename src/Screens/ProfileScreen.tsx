import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../Context/AuthContext";

const ProfileScreen = () => {
  const { logout } = useAuth();
  const [userInfo] = useState({
    name: "John Doe",
    phone: "+880 1712-345678",
    email: "john.doe@example.com",
    balance: "৳580",
    activePackages: 2,
  });

  const handleLogout = async () => {
    Alert.alert("লগআউট করুন", "আপনি কি নিশ্চিত লগআউট করতে চান?", [
      {
        text: "বাতিল",
        style: "cancel",
      },
      {
        text: "লগআউট",
        onPress: async () => {
          await logout();
          Alert.alert("সফল", "সফলভাবে লগআউট হয়েছে");
        },
        style: "destructive",
      },
    ]);
  };

  const menuItems = [
    {
      id: "1",
      title: "ব্যক্তিগত তথ্য",
      subtitle: "আপনার প্রোফাইল সম্পাদনা করুন",
      icon: "person-outline",
      color: "#3B82F6",
      bgColor: "#EFF6FF",
    },
    {
      id: "2",
      title: "লেনদেনের ইতিহাস",
      subtitle: "আপনার সকল লেনদেন দেখুন",
      icon: "receipt-outline",
      color: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      id: "3",
      title: "সক্রিয় প্যাকেজ",
      subtitle: `${userInfo.activePackages}টি প্যাকেজ চালু আছে`,
      icon: "cube-outline",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
    {
      id: "4",
      title: "পেমেন্ট পদ্ধতি",
      subtitle: "আপনার পেমেন্ট অপশন পরিচালনা করুন",
      icon: "card-outline",
      color: "#8B5CF6",
      bgColor: "#F3E8FF",
    },
    {
      id: "5",
      title: "সেটিংস",
      subtitle: "অ্যাপ সেটিংস পরিবর্তন করুন",
      icon: "settings-outline",
      color: "#6B7280",
      bgColor: "#F3F4F6",
    },
    {
      id: "6",
      title: "সহায়তা কেন্দ্র",
      subtitle: "সাহায্যের জন্য যোগাযোগ করুন",
      icon: "help-circle-outline",
      color: "#EC4899",
      bgColor: "#FCE7F3",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header with Profile Card */}
      <View className="bg-blue-600 pt-12 pb-32 px-5">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-2xl font-bold">প্রোফাইল</Text>
          <TouchableOpacity className="bg-white/20 p-2 rounded-full">
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info Card */}
      <View className="px-5 -mt-24">
        <View className="bg-white rounded-3xl p-6 shadow-lg">
          <View className="items-center mb-4">
            <View className="bg-blue-100 rounded-full p-1 mb-3">
              <View className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-full p-6">
                <Ionicons name="person" size={40} color="white" />
              </View>
            </View>
            <Text className="text-2xl font-bold text-gray-800">
              {userInfo.name}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">{userInfo.phone}</Text>
            <Text className="text-gray-400 text-xs">{userInfo.email}</Text>
          </View>

          {/* Balance Card */}
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-5 flex-row justify-between items-center mt-4">
            <View>
              <Text className="text-white/80 text-xs mb-1">মোট ব্যালেন্স</Text>
              <Text className="text-white text-3xl font-black">
                {userInfo.balance}
              </Text>
            </View>
            <TouchableOpacity className="bg-white px-5 py-3 rounded-xl">
              <Text className="text-blue-600 font-bold text-sm">রিচার্জ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-5 mt-6 pb-8">
        <Text className="text-gray-800 text-lg font-bold mb-3">মেনু</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm"
            activeOpacity={0.7}
          >
            <View
              className="rounded-xl p-3 mr-4"
              style={{ backgroundColor: item.bgColor }}
            >
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View className="flex-1">
              <Text className="text-gray-800 font-bold text-base mb-0.5">
                {item.title}
              </Text>
              <Text className="text-gray-500 text-xs">{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mt-4 flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text className="text-red-600 font-bold text-base ml-2">
            লগআউট করুন
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-gray-400 text-center text-xs mt-6">
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
