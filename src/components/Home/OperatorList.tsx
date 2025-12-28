import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { RootTabParamList } from "../../Navigation/types";

type NavigationProp = BottomTabNavigationProp<RootTabParamList, "Home">;

export default function OperatorList() {
  const navigation = useNavigation<NavigationProp>();

  const operators = [
    {
      id: "1",
      image: require("../../../assets/img/gp.png"),
      name: "Grameenphone",
      shortName: "GP",
      color: "#00A1E0",
    },
    {
      id: "2",
      image: require("../../../assets/img/bl.png"),
      name: "Banglalink",
      shortName: "BL",
      color: "#FF6B00",
    },
    {
      id: "3",
      image: require("../../../assets/img/air.png"),
      name: "Airtel",
      shortName: "Airtel",
      color: "#E60000",
    },
    {
      id: "4",
      image: require("../../../assets/img/robi.png"),
      name: "Robi",
      shortName: "Robi",
      color: "#E60028",
    },
    {
      id: "5",
      image: require("../../../assets/img/tel.png"),
      name: "Teletalk",
      shortName: "TT",
      color: "#00A859",
    },
  ];

  const handleOperatorPress = (operator: any) => {
    navigation.navigate("PackageList", {
      operatorName: operator.name,
      operatorImage: operator.image,
      operatorId: operator.id,
    });
  };

  return (
    <View className="bg-gray-50">
      <View className="mx-4 my-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Choose Operator
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Select your mobile operator to view packages
            </Text>
          </View>
          <Ionicons name="phone-portrait-outline" size={32} color="#3B82F6" />
        </View>

        {/* Operators Grid */}
        <View className="flex-row flex-wrap gap-3">
          {operators.map((operator) => (
            <TouchableOpacity
              key={operator.id}
              onPress={() => handleOperatorPress(operator)}
              className="bg-white rounded-2xl shadow-md overflow-hidden active:scale-95"
              style={{ width: "31%", elevation: 3 }}
            >
              <View className="items-center justify-center p-4 pt-6">
                <View className="bg-gray-50 rounded-xl p-3 mb-3">
                  <Image
                    source={operator.image}
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  className="text-xs font-bold text-center mb-1"
                  style={{ color: operator.color }}
                >
                  {operator.shortName}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-[10px] text-gray-500 mr-1">View</Text>
                  <Ionicons name="arrow-forward" size={10} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Card */}
        <View className="bg-blue-50 rounded-2xl p-4 mt-4 flex-row items-center border border-blue-200">
          <View className="bg-blue-100 rounded-full p-2 mr-3">
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-blue-900 mb-1">
              Quick Access
            </Text>
            <Text className="text-xs text-blue-700">
              Tap any operator to view available packages
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
