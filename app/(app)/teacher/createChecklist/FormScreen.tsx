import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import {
  ChecklistCreationProvider,
  useChecklistCreation,
} from "~/app/context/CheckListCreationContext";
import { useClass } from "~/app/context/ClassProvider";
import CTextInput from "../../components/TextInput";
import { useCreateCheckList } from "../../hooks/useCheckList";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const FormScreen = () => {
  const { userRole } = useAuth();
  const { currentClassId } = useClass();

  const createChecklist = useCreateCheckList();
  const { state, dispatch } = useChecklistCreation();

  const router = useRouter();
  const translateY = useSharedValue(0);
  const containerRef = useRef<ScrollView>(null);
  const itemRefs = useRef<Array<TextInput | null>>([]);

  React.useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
  }, []);

  useEffect(() => {
    // Focus on the last item when items change
    if (state.items.length > 0) {
      const lastItemIndex = state.items.length - 1;
      const lastItemRef = itemRefs.current[lastItemIndex];
      if (lastItemRef) {
        lastItemRef.focus();
      }
    }
  }, [state.items.length]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const formatDateToKorean = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const handleAddItem = () => {
    dispatch({ type: "ADD_ITEM" });
    // scroll to bottom
    containerRef.current?.scrollToEnd();
  };

  const handleSubmit = () => {
    console.log(state);
    createChecklist.mutate({
      classId: currentClassId!,
      checklist: {
        ...state,
        checklist_type: userRole as "teacher" | "student",
      },
    });
  };

  return (
    <Animated.View style={[{ flex: 1, padding: 16 }, animatedStyles]}>
      <ScrollView
        ref={containerRef}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
      >
        <TouchableOpacity
          onPress={() => router.push("/teacher/createChecklist/CalendarScreen")}
          className="flex-row border border-slate-100 bg-slate-100 rounded-lg p-4 items-center mb-4"
        >
          <Feather name="calendar" size={24} color="#6B7280" />
          <Text className="text-gray-800 font-semibold ml-2">
            {formatDateToKorean(state.scheduledAt)}
          </Text>
        </TouchableOpacity>

        <CTextInput
          placeholder="제목"
          value={state.title}
          onChangeText={(text) =>
            dispatch({ type: "SET_TITLE", payload: text })
          }
        />

        <CTextInput
          placeholder="설명"
          value={state.description}
          onChangeText={(text) =>
            dispatch({ type: "SET_DESCRIPTION", payload: text })
          }
          multiline
          numberOfLines={4}
        />

        {userRole === "teacher" && (
          <View className="flex-row justify-end items-center gap-4 my-2">
            <Text className="font-semibold text-gray-500">익명 여부</Text>
            <Switch
              value={state.isPublic}
              onValueChange={(value) =>
                dispatch({ type: "SET_IS_PUBLIC", payload: value })
              }
            />
          </View>
        )}

        <Text className="text-xl font-bold mt-4 mb-2 text-gray-800">
          체크리스트 항목
        </Text>

        {state.items.map((item, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <TextInput
              ref={(ref) => (itemRefs.current[index] = ref)}
              className="flex-1 text-base bg-white border border-gray-200 rounded-lg p-3 mr-2 text-gray-800 focus:border-black transition-colors"
              placeholder={`항목 ${index + 1}`}
              value={item.description}
              onChangeText={(text) =>
                dispatch({
                  type: "UPDATE_ITEM",
                  payload: { index, description: text },
                })
              }
            />
            <TouchableOpacity
              onPress={() => dispatch({ type: "REMOVE_ITEM", payload: index })}
            >
              <Ionicons
                name="remove-circle-outline"
                size={20}
                color="#EF4444"
              />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddItem}
          className="bg-blue-50 rounded-lg p-3 items-center mb-4"
        >
          <Text className="text-blue-500 font-semibold">+ 항목 추가</Text>
        </TouchableOpacity>
      </ScrollView>
      <View className="absolute bottom-4 left-0 right-0 p-4 bg-white">
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-500 p-4 rounded-full border-2"
        >
          <Text className="font-bold text-lg text-center text-white">
            체크리스트 생성
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FormScreen;
