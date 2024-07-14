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
import CTextInput from "../(app)/components/TextInput";
import { Octicons } from "@expo/vector-icons";
import { useForm } from "../hooks/useForm";
import { registrationSchema } from "../schemas";
import { cn } from "~/lib/utils";

interface Errors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { values, errors, handleBlur, handleChange, validateForm } = useForm(
    {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    registrationSchema
  );

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const isValid = await validateForm();
      if (!isValid) {
        return;
      }

      const { email, password } = values;
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("already")) {
          setError("이미 가입된 이메일입니다.");
        } else {
          setError(error.message);
        }
      } else {
        router.replace("/RegisterScreen");
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
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
            <View className="gap-4">
              <CTextInput
                value={values.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                placeholder="이메일"
                autoCapitalize="none"
                errorMessage={errors.email}
              />
              <CTextInput
                placeholder="비밀번호"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={(text) => handleChange("password", text)}
                errorMessage={errors.password}
                rightIcon={
                  <Octicons
                    name={showPassword ? "eye" : "eye-closed"}
                    size={20}
                    color="black"
                  />
                }
                rightIconAction={() => {
                  setShowPassword(!showPassword);
                }}
                onBlur={() => handleBlur("password")}
              />
              <CTextInput
                placeholder="비밀번호 확인"
                secureTextEntry={!showPassword}
                value={values.passwordConfirm}
                onChangeText={(text) => handleChange("passwordConfirm", text)}
                onBlur={() => handleBlur("passwordConfirm")}
                errorMessage={errors?.passwordConfirm}
              />
              <Text className="text-red-500 text-sm">{error}</Text>
              <TouchableOpacity
                className={cn(
                  "w-full rounded-full py-4 mt-4",
                  loading ? "bg-gray-300" : "bg-blue-600"
                )}
                onPress={handleSignUp}
              >
                <Text className="text-center text-base font-semibold text-white">
                  {loading ? "가입 중..." : "가입하기"}
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
