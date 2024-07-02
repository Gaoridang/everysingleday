import React, { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";

const SplashScreen = ({ isTransitioning }: { isTransitioning: boolean }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isTransitioning) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isTransitioning]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../../assets/pencil_logo.png")} // 로고 이미지 경로를 적절히 수정해주세요
        className="w-48 h-48 object-contain"
      />
    </View>
  );
};

export default SplashScreen;
