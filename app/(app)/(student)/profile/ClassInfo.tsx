import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";

interface ClassInfo {
  school: string;
  grade: number;
  class_number: number;
}

const ClassInfo = () => {
  const { user } = useAuth();
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getMainClass = async () => {
      const { data, error } = await supabase
        .from("main_class_view")
        .select("school, grade, class_number")
        .eq("profile_id", user?.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching main class:", error);
      } else {
        setClassInfo(data);
      }
    };

    if (user) {
      getMainClass();
    }
  }, []);

  return (
    <Link href="/profile/classList" asChild>
      <TouchableOpacity className="flex-row justify-between items-center p-4 bg-slate-100 rounded-lg">
        <View>
          <Text className="text-lg font-semibold mb-2">학급 정보</Text>
          {classInfo ? (
            <Text>
              {classInfo?.school} {classInfo?.grade}학년{" "}
              {classInfo?.class_number}반
            </Text>
          ) : (
            <Text>학급이 없습니다.</Text>
          )}
        </View>
        {classInfo ? (
          <Feather name="chevron-right" size={24} color="#4B5563" />
        ) : (
          <TouchableOpacity onPress={() => router.push("/account/CreateClass")}>
            <Text className="text-white font-semibold">학급 만들기</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default ClassInfo;
