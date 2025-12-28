import React from "react";
import { ScrollView } from "react-native";
import BannerSlider from "../components/Home/BannerSlider";
import OperatorList from "../components/Home/OperatorList";

const HomeScreen = () => {
  return (
    <ScrollView className="bg-gray-50">
      <BannerSlider />
      <OperatorList />
    </ScrollView>
  );
};

export default HomeScreen;
