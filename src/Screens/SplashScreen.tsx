import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function SplashScreen({
  onAnimationFinish,
}: {
  onAnimationFinish: () => void;
}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/splash-animation.json")} // Add a lottie json file here
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
