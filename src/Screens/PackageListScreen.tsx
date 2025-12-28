import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// স্যাম্পল ডাটা (এটি আপনি API থেকে নিতে পারেন)
const PACKAGES = [
  {
    id: "1",
    type: "Internet",
    title: "10GB Regular Data",
    validity: "30 Days",
    price: "499",
    volume: "10GB",
    note: "+ Free Bioscope Access",
  },
  {
    id: "2",
    type: "Minute",
    title: "500 Minutes Local",
    validity: "30 Days",
    price: "307",
    volume: "500 Min",
    note: "Any Local Number",
  },
  {
    id: "3",
    type: "Bundle",
    title: "Combo 15GB + 400 Min",
    validity: "30 Days",
    price: "699",
    volume: "Bundle",
    note: "Best Seller",
  },
  {
    id: "4",
    type: "Internet",
    title: "2GB Social Pack",
    validity: "7 Days",
    price: "54",
    volume: "2GB",
    note: "FB & WhatsApp only",
  },
];

export default function PackageList() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { operatorName, operatorImage, operatorId } = route.params;

  const [activeTab, setActiveTab] = useState("Internet");
  const categories = ["Internet", "Minute", "Bundle", "Special"];

  // ফিল্টার করা ডাটা
  const filteredPackages = PACKAGES.filter((pkg) => pkg.type === activeTab);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBuyPress = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  const confirmPurchase = () => {
    if (phoneNumber.length < 11) {
      alert("অনুগ্রহ করে সঠিক ১১ ডিজিটের নম্বর দিন");
      return;
    }
    // এখানে আপনার পেমেন্ট বা রিচার্জ লজিক আসবে
    alert(`${selectedPackage.title} কেনা হয়েছে ${phoneNumber} নম্বরে!`);
    setIsModalVisible(false);
  };

  const renderPackageItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white mx-4 mb-4 rounded-3xl p-5 border border-gray-100 shadow-sm"
      style={styles.cardShadow}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <View className="bg-blue-50 self-start px-3 py-1 rounded-full mb-2">
            <Text className="text-blue-600 text-[10px] font-bold uppercase">
              {item.validity}
            </Text>
          </View>
          <Text className="text-lg font-bold text-gray-800 leading-6">
            {item.title}
          </Text>
          <Text className="text-gray-400 text-xs mt-1">{item.note}</Text>
        </View>
        <View className="items-end">
          <Text className="text-2xl font-black text-blue-600">
            ৳{item.price}
          </Text>
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded-xl mt-2"
            onPress={() => handleBuyPress(item)}
          >
            <Text className="text-white font-bold text-xs">কিনুন</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Custom Header */}
      <View className="bg-white pt-12 pb-6 px-5 rounded-b-[40px] shadow-sm">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center">
          <View className="bg-gray-100 p-2 rounded-2xl">
            <Image
              source={operatorImage}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>
          <View className="ml-4">
            <Text className="text-2xl font-bold text-gray-900">
              {operatorName}
            </Text>
            <Text className="text-gray-500 font-medium">
              আপনার পছন্দের প্যাকেজটি বেছে নিন
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs / Categories Filter */}
      <View className="my-6">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              className={`mr-3 px-6 py-3 rounded-2xl border ${
                activeTab === item
                  ? "bg-blue-600 border-blue-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-bold ${
                  activeTab === item ? "text-white" : "text-gray-600"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Package List */}
      <FlatList
        data={filteredPackages}
        keyExtractor={(item) => item.id}
        renderItem={renderPackageItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Ionicons name="alert-circle-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-400 mt-2">
              এই ক্যাটাগরিতে কোনো প্যাকেজ নেই
            </Text>
          </View>
        }
      />
      {/* Purchase Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="bg-white w-full rounded-t-[40px] p-8"
          >
            {/* মডার্ন হ্যান্ডেল বার */}
            <View className="w-12 h-1.5 bg-gray-200 self-center rounded-full mb-6" />

            <Text className="text-xl font-bold text-gray-800 mb-2">
              প্যাকেজ নিশ্চিত করুন
            </Text>

            {selectedPackage && (
              <View className="bg-blue-50 p-4 rounded-2xl mb-6">
                <Text className="text-blue-800 font-bold">
                  {selectedPackage.title}
                </Text>
                <Text className="text-blue-600 font-black text-lg">
                  ৳{selectedPackage.price}
                </Text>
              </View>
            )}

            <Text className="text-gray-600 font-medium mb-2">
              মোবাইল নম্বর লিখুন
            </Text>
            <TextInput
              placeholder="01XXXXXXXXX"
              keyboardType="numeric"
              maxLength={11}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              className="bg-gray-100 p-4 rounded-2xl text-lg font-bold text-gray-800 border border-gray-200 mb-6"
            />

            <View className="flex-row gap-4">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="flex-1 bg-gray-100 p-4 rounded-2xl items-center"
              >
                <Text className="text-gray-600 font-bold">বাতিল</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmPurchase}
                className="flex-1 bg-blue-600 p-4 rounded-2xl items-center shadow-lg shadow-blue-200"
              >
                <Text className="text-white font-bold">নিশ্চিত করুন</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
});
