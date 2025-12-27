import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function BannerSlider() {
  const data = [
    {
      id: "1",
      image:
        "https://cdn.pixabay.com/photo/2016/03/26/22/54/sandwich-1281711_1280.jpg",
    },
    {
      id: "2",
      image:
        "https://cdn.pixabay.com/photo/2017/11/23/07/47/baby-2972221_1280.jpg",
    },
    {
      id: "3",
      image:
        "https://cdn.pixabay.com/photo/2025/06/05/12/25/turtle-9642956_1280.jpg",
    },
  ];
  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      autoPlayInterval={5000}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
