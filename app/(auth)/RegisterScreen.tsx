import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RolePicker from "../onboarding/RolePicker";
import NameInput from "../onboarding/NameInput";
import ImageUpload from "../onboarding/ImageUpload";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthProvider";
import { router } from "expo-router";

const RegisterScreen = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    avatar: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id!,
      role: formData.role,
      name: formData.name,
    });

    if (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    } else {
      alert("프로필이 업데이트 되었습니다.");
      router.push("/" + formData.role);
    }
  };

  return (
    <View>
      {step === 1 && (
        <View>
          <RolePicker
            selectedRole={formData.role}
            onSelect={(role) => setFormData({ ...formData, role })}
          />
          <TouchableOpacity onPress={handleNext}>
            <Text>다음</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 2 && (
        <View>
          <NameInput
            name={formData.name}
            setName={(text) => setFormData({ ...formData, name: text })}
          />
          <TouchableOpacity onPress={handleBack}>
            <Text>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text>다음</Text>
          </TouchableOpacity>
        </View>
      )}
      {step === 3 && (
        <View>
          <ImageUpload />
          <TouchableOpacity onPress={handleSubmit}>
            <Text>제출</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RegisterScreen;
