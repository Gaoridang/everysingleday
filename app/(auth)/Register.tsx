import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    } else {
      router.replace("/onboarding/SelectRoleScreen");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="flexGrow-1 justifyContent-center">
          <View className="px-8 py-12">
            <Text className="font-bold text-4xl mb-8 text-gray-800 text-center">
              Every Single Day
            </Text>
            <View>
              <TextInput
                className="w-full text-base border-b border-gray-300 p-4 mb-6 text-gray-800"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                placeholder="이메일"
                placeholderTextColor="rgba(107, 114, 128, 0.6)"
                autoCapitalize="none"
              />
              <TextInput
                className="w-full text-base border-b border-gray-300 p-4 mb-6 text-gray-800"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                placeholder="비밀번호"
                placeholderTextColor="rgba(107, 114, 128, 0.6)"
              />
              <TouchableOpacity
                className="w-full bg-blue-600 rounded-full py-4 mt-4"
                onPress={handleSignUp}
              >
                <Text className="text-center text-base font-semibold text-white">
                  회원가입
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(auth)")}
              className="mt-6"
            >
              <Text className="text-center text-gray-600 text-base">
                이미 계정이 있으신가요?{" "}
                <Text className="text-blue-600 font-semibold">로그인</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
