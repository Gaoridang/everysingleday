import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";
import GoogleSignInButton from "./GoogleSignInButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    } else {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        throw profileError;
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flexGrow-1 justifyContent-center"
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onPress={handleLogin}
              >
                <Text className="text-center text-base font-semibold text-white">
                  로그인
                </Text>
              </TouchableOpacity>
            </View>
            <View className="my-8 mx-10 flex-row items-center">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-sm font-bold">또는</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>
            <GoogleSignInButton />
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              className="mt-6"
            >
              <Text className="text-center text-gray-600 text-base">
                계정이 없으신가요?{" "}
                <Text className="text-blue-600 font-semibold">회원가입</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
