import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "expo-router";

const roles = [
  { id: "teacher", label: "선생님" },
  { id: "student", label: "학생" },
  { id: "parent", label: "학부모" },
];

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (selectedRole) {
      // TODO: 선택된 역할을 서버에 저장하거나 다음 화면으로 네비게이션
      console.log("Selected role:", selectedRole);
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, role: selectedRole });

      if (error) {
        console.error("error", error);
        return;
      } else {
        router.replace("/onboarding/avatar");
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-8">
        어떤 역할로 사용하시겠습니까?
      </Text>
      {roles.map((role) => (
        <TouchableOpacity
          key={role.id}
          className={`w-full py-4 px-6 rounded-lg border mb-4 ${
            selectedRole === role.id
              ? "bg-blue-500 border-blue-500"
              : "border-gray-300"
          }`}
          onPress={() => handleRoleSelection(role.id)}
        >
          <Text
            className={`text-lg text-center ${
              selectedRole === role.id ? "text-white" : "text-gray-700"
            }`}
          >
            {role.label}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        className={`w-full py-4 px-6 rounded-lg mt-6 ${
          selectedRole ? "bg-blue-500" : "bg-gray-300"
        }`}
        onPress={handleSubmit}
        disabled={!selectedRole}
      >
        <Text className="text-lg font-semibold text-center text-white">
          다음
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;
