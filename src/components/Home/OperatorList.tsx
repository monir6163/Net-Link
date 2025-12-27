import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function OperatorList() {
  const operators = [
    { id: "1", name: "Operator 1" },
    { id: "2", name: "Operator 2" },
    { id: "3", name: "Operator 3" },
    { id: "4", name: "Operator 4" },
    { id: "5", name: "Operator 5" },
    { id: "6", name: "Operator 6" },
  ];
  return (
    <View className="bg-slate-200">
      <View className="mx-4 my-4">
        <Text className="text-lg font-semibold mb-2 border-b-2 border-gray-400 pb-1">
          Available Operators
        </Text>
        <View className="flex-row flex-wrap gap-2 mt-4 justify-between">
          {operators.map((operator) => (
            <View
              key={operator.id}
              className="p-2 bg-white rounded-lg mb-4 items-center justify-center shadow flex-auto"
            >
              <Text>{operator.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
