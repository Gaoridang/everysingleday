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
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center px-6 pt-20">
            <Text className="font-bold text-3xl mb-12">Every Single Day</Text>
            <GoogleSignInButton />
            <TextInput
              className="w-full text-base border-b border-gray-300 p-2 mb-4"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              placeholder="이메일"
              autoCapitalize="none"
            />
            <TextInput
              className="w-full text-base border-b border-gray-300 p-2 mb-6"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Password"
            />
            <TouchableOpacity
              className="w-full bg-blue-500 rounded-md py-3 mb-4"
              onPress={handleLogin}
            >
              <Text className="text-center text-white text-base font-semibold">
                로그인
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text className="text-blue-500">회원가입</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
