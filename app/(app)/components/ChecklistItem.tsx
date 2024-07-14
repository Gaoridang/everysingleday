import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RowList from "./RowList";
import { useUpdateChecklistStatus } from "../hooks/useCheckList";

interface Props {
  item: any;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const ChecklistItem = ({ item }: Props) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const updateChecklist = useUpdateChecklistStatus();

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: item.status === "active" ? 100 : 0, // 확장된 높이를 적절히 조정하세요
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [item.status]);

  const toggleExpand = () => {
    updateChecklist.mutate({
      status: "active",
      checklistId: item.id,
    });
  };

  return (
    <View>
      <AnimatedTouchableOpacity>
        <RowList
          className="bg-white"
          type="link"
          right={{
            type: "button",
            content: "알림 보내기",
          }}
          content={{
            main: item.title,
            sub: item.scheduled_at,
          }}
          onPress={toggleExpand}
        />
      </AnimatedTouchableOpacity>
      <Animated.View style={{ height: animatedHeight, overflow: "hidden" }}>
        <View className="bg-slate-200 p-4">
          <Text>진행중인 체크리스트</Text>
          {/* 여기에 학생들의 체크리스트 상태를 표시하는 컴포넌트를 추가하세요 */}
        </View>
      </Animated.View>
    </View>
  );
};

export default ChecklistItem;
