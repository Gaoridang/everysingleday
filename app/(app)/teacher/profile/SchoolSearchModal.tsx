import React, { useState, useCallback } from "react";
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SchoolInfo, searchSchools } from "~/app/utils/schoolApi";
import { debounce } from "lodash";

interface SchoolSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSchool: (school: string) => void;
}

const SchoolSearchModal: React.FC<SchoolSearchModalProps> = ({
  visible,
  onClose,
  onSelectSchool,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schools, setSchools] = useState<SchoolInfo[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.length >= 2) {
        const results = await searchSchools(term);
        setSchools(results);
      } else {
        setSchools([]);
      }
    }, 300),
    []
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };

  const renderSchoolItem = ({ item }: { item: SchoolInfo }) => (
    <TouchableOpacity
      onPress={() => onSelectSchool(item.SCHUL_NM)}
      className="bg-white p-4 mb-2 rounded-lg border border-gray-200"
    >
      <Text className="font-bold text-base mb-1">{item.SCHUL_NM}</Text>
      <Text className="text-gray-600">{item.ORG_RDNMA}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView className="flex-1 bg-gray-100">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">학교 검색</Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-blue-500 text-base">닫기</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="학교명을 입력하세요"
            value={searchTerm}
            onChangeText={handleSearch}
            className="border border-gray-300 rounded-lg p-3 m-4 bg-white"
          />
          <FlatList
            data={schools}
            renderItem={renderSchoolItem}
            keyExtractor={(item) => item.SD_SCHUL_CODE}
            className="flex-1 px-4"
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default SchoolSearchModal;
