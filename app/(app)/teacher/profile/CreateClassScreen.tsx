import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCreateClass } from "../../hooks/useUserClass";
import SchoolSearchModal from "./SchoolSearchModal";

const CreateClassScreen = () => {
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createClass = useCreateClass();
  const handleCreateClass = async () => {
    if (!school || !grade || !classNumber) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    createClass.mutate({
      school,
      grade,
      classNumber,
    });
  };

  const handleSelectSchool = (selectedSchool: string) => {
    setSchool(selectedSchool);
    setIsModalVisible(false);
  };

  return (
    <ScrollView className="flex-1">
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

export default CreateClassScreen;
