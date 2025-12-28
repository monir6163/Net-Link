import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
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
  // ================= Grameenphone =================
  {
    id: "1",
    type: "Internet",
    operatorId: "1",
    operatorName: "Grameenphone",
    title: "10GB Regular Data",
    validity: "30 Days",
    price: "499",
    volume: "10GB",
    note: "+ Free Bioscope Access",
  },
  {
    id: "2",
    type: "Minute",
    operatorId: "1",
    operatorName: "Grameenphone",
    title: "500 Minutes Local",
    validity: "30 Days",
    price: "307",
    volume: "500 Min",
    note: "Any Local Number",
  },
  {
    id: "7",
    type: "Wifi",
    operatorId: "1",
    operatorName: "Grameenphone",
    title: "5GB Wifi Data",
    validity: "30 Days",
    price: "299",
    volume: "5GB",
    isPopular: true,
    note: "For Home Wifi Use",
  },

  // ================= Robi =================
  {
    id: "8",
    type: "Internet",
    operatorId: "2",
    operatorName: "Robi",
    title: "8GB Regular Data",
    validity: "30 Days",
    price: "398",
    volume: "8GB",
    note: "All Apps Supported",
  },
  {
    id: "9",
    type: "Minute",
    operatorId: "2",
    operatorName: "Robi",
    title: "300 Minutes",
    validity: "30 Days",
    price: "249",
    volume: "300 Min",
    note: "Any Local Number",
  },
  {
    id: "10",
    type: "Bundle",
    operatorId: "2",
    operatorName: "Robi",
    title: "10GB + 200 Min Combo",
    validity: "30 Days",
    price: "599",
    volume: "Bundle",
    isPopular: true,
    note: "Best Value",
  },
  {
    id: "3",
    type: "Wifi",
    operatorId: "2",
    operatorName: "Robi",
    title: "4GB Wifi Data",
    validity: "30 Days",
    price: "249",
    volume: "4GB",
    note: "For Home Wifi Use",
  },

  // ================= Airtel =================
  {
    id: "11",
    type: "Internet",
    operatorId: "3",
    operatorName: "Airtel",
    title: "6GB Internet Pack",
    validity: "15 Days",
    price: "299",
    volume: "6GB",
    note: "Regular Data",
  },
  {
    id: "12",
    type: "Special",
    operatorId: "3",
    operatorName: "Airtel",
    title: "Night 10GB",
    validity: "7 Days",
    price: "199",
    volume: "10GB",
    note: "12AM - 6AM",
  },
  {
    id: "4",
    type: "Wifi",
    operatorId: "3",
    operatorName: "Airtel",
    title: "3GB Wifi Data",
    validity: "30 Days",
    price: "199",
    volume: "3GB",
    note: "For Home Wifi Use",
  },

  // ================= Banglalink =================
  {
    id: "13",
    type: "Internet",
    operatorId: "4",
    operatorName: "Banglalink",
    title: "12GB Data Pack",
    validity: "30 Days",
    price: "549",
    volume: "12GB",
    note: "Free Toffee App",
  },
  {
    id: "14",
    type: "Minute",
    operatorId: "4",
    operatorName: "Banglalink",
    title: "1000 Minutes",
    validity: "30 Days",
    price: "499",
    volume: "1000 Min",
    isPopular: true,
    note: "BL & Other Operators",
  },
  {
    id: "5",
    type: "Wifi",
    operatorId: "4",
    operatorName: "Banglalink",
    title: "6GB Wifi Data",
    validity: "30 Days",
    price: "349",
    volume: "6GB",
    isBest: true,
    note: "For Home Wifi Use",
  },

  // ================= Teletalk =================
  {
    id: "15",
    type: "Internet",
    operatorId: "5",
    operatorName: "Teletalk",
    title: "5GB Data Pack",
    validity: "30 Days",
    price: "300",
    volume: "5GB",
    note: "Government Operator",
  },
  {
    id: "16",
    type: "Bundle",
    operatorId: "5",
    operatorName: "Teletalk",
    title: "3GB + 150 Min",
    validity: "15 Days",
    price: "249",
    volume: "Bundle",
    note: "Budget Combo",
  },
  {
    id: "6",
    type: "Wifi",
    operatorId: "5",
    operatorName: "Teletalk",
    title: "2GB Wifi Data",
    validity: "30 Days",
    price: "199",
    volume: "2GB",
    note: "For Home Wifi Use",
  },

  // ================= Skitto =================
  {
    id: "17",
    type: "Internet",
    operatorId: "6",
    operatorName: "Skitto",
    title: "7GB Data Pack",
    validity: "30 Days",
    price: "399",
    volume: "7GB",
    note: "All Apps Supported",
  },
  {
    id: "18",
    type: "Special",
    operatorId: "6",
    operatorName: "Skitto",
    title: "Social Media Pack 5GB",
    validity: "15 Days",
    price: "199",
    volume: "5GB",
    note: "Facebook, WhatsApp, YouTube",
  },
  {
    id: "19",
    type: "Wifi",
    operatorId: "6",
    operatorName: "Skitto",
    title: "3GB Wifi Data",
    validity: "30 Days",
    price: "249",
    volume: "3GB",
    note: "For Home Wifi Use",
  },
];

export default function PackageList() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { operatorName, operatorImage, operatorId } = route.params;

  const [activeTab, setActiveTab] = useState("Wifi");
  const categories = [
    "Wifi",
    "Internet",
    "Minute",
    "FlexiLoad",
    "Bundle",
    "Special",
  ];

  // ফিল্টার করা ডাটা
  const filteredPackages = PACKAGES.filter(
    (pkg) => pkg.operatorId === operatorId && pkg.type === activeTab
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [wifiUserId, setWifiUserId] = useState("");

  const handleBuyPress = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  const confirmPurchase = () => {
    if (phoneNumber.length < 11) {
      alert("অনুগ্রহ করে সঠিক ১১ ডিজিটের নম্বর দিন");
      return;
    }
    if (selectedPackage?.type === "Wifi") {
      if (!name.trim()) {
        alert("অনুগ্রহ করে আপনার নাম লিখুন");
        return;
      }
      if (!wifiUserId.trim()) {
        alert("অনুগ্রহ করে WiFi ইউজার আইডি লিখুন");
        return;
      }
    }
    // এখানে আপনার পেমেন্ট বা রিচার্জ লজিক আসবে
    alert(`${selectedPackage.title} কেনা হয়েছে ${phoneNumber} নম্বরে!`);
    setIsModalVisible(false);
    setPhoneNumber("");
    setName("");
    setWifiUserId("");
  };

  useFocusEffect(
    useCallback(() => {
      setActiveTab("Wifi");
      return () => {};
    }, [])
  );

  const renderPackageItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white mx-4 mb-4 rounded-3xl p-5 border border-gray-100 shadow-sm"
      style={styles.cardShadow}
    >
      {(item.isPopular || item.isBest) && (
        <View
          style={{
            position: "absolute",
            right: 20,
            top: -5,
            backgroundColor: item.isPopular ? "#FF9800" : "#4CAF50",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 8,
            zIndex: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 9, fontWeight: "bold" }}>
            {item.isPopular ? "POPULAR" : "BEST OFFER"}
          </Text>
        </View>
      )}
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
            className="bg-blue-600 px-4 py-2 rounded-xl mt-2 w-full items-center shadow-lg shadow-blue-200"
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
            {selectedPackage?.type === "Wifi" && (
              <View className="mb-4">
                <View className="bg-amber-50 p-4 rounded-2xl mb-4 border border-amber-200">
                  <View className="flex-row items-center mb-1">
                    <Ionicons
                      name="information-circle"
                      size={18}
                      color="#F59E0B"
                    />
                    <Text className="text-amber-700 font-bold ml-2">
                      WiFi প্যাকেজ
                    </Text>
                  </View>
                  <Text className="text-amber-600 text-xs">
                    এই প্যাকেজটি শুধুমাত্র হোম ওয়াইফাই ব্যবহারের জন্য।
                  </Text>
                </View>

                <Text className="text-gray-600 font-medium mb-2">
                  আপনার নাম
                </Text>
                <TextInput
                  placeholder="পূর্ণ নাম লিখুন"
                  value={name}
                  onChangeText={setName}
                  className="bg-gray-100 p-4 rounded-2xl text-base text-gray-800 border border-gray-200 mb-4"
                />

                <Text className="text-gray-600 font-medium mb-2">
                  WiFi ইউজার আইডি
                </Text>
                <TextInput
                  placeholder="WiFi User ID লিখুন"
                  value={wifiUserId}
                  onChangeText={setWifiUserId}
                  className="bg-gray-100 p-4 rounded-2xl text-base text-gray-800 border border-gray-200"
                />
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
