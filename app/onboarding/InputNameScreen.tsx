import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthProvider";
import { router } from "expo-router";

const InputNameScreen = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!name.trim()) {
      // 이름이 비어있으면 제출하지 않음
      alert("이름을 입력해주세요.");
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user?.id!, name: name.trim() });

      if (error) throw error;

      router.replace("/onboarding/SelectAvatarScreen");
    } catch (error) {
      console.error("Error updating name:", error);
      alert("이름 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text>당신의 이름은 무엇인가요?</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
          autoFocus
          maxLength={50}
        />
        <TouchableOpacity onPress={handleSubmit} disabled={!name.trim()}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputNameScreen;
