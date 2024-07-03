import React, { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";
import SchoolSearchModal from "./SchoolSearchModal";

const CreateClass = () => {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateClass = async () => {
    if (!school || !grade || !classNumber) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("classes")
        .insert([
          {
            school,
            grade: parseInt(grade),
            class_number: parseInt(classNumber),
            created_by: user?.id,
            year: new Date().getFullYear(),
          },
        ])
        .select();

      if (error) throw error;

      Alert.alert("성공", "학급이 성공적으로 생성되었습니다.");
      // 성공 후 로직 (예: 홈 화면으로 이동)
    } catch (error) {
      console.error("Error creating class:", error);
      Alert.alert("오류", "학급 생성 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSchool = (selectedSchool: string) => {
    setSchool(selectedSchool);
    setIsModalVisible(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6 text-center">
          새 학급 만들기
        </Text>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">학교</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="bg-white border border-gray-300 rounded-md p-3 flex-row justify-between items-center"
          >
            <Text className={school ? "text-black" : "text-gray-400"}>
              {school || "학교를 선택해주세요"}
            </Text>
            <Text className="text-blue-500">검색</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">학년</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-md p-3"
            placeholder="학년을 입력하세요"
            value={grade}
            onChangeText={setGrade}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-1">반</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-md p-3"
            placeholder="반 번호를 입력하세요"
            value={classNumber}
            onChangeText={setClassNumber}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          onPress={handleCreateClass}
          disabled={isLoading}
          className={`rounded-md py-3 px-4 ${
            isLoading ? "bg-blue-300" : "bg-blue-500"
          }`}
        >
          <Text className="text-white text-center font-bold">
            {isLoading ? "생성 중..." : "학급 생성"}
          </Text>
        </TouchableOpacity>
      </View>

      <SchoolSearchModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectSchool={handleSelectSchool}
      />
    </ScrollView>
  );
};

export default CreateClass;
