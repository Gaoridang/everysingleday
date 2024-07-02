import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface MainClass {
  school: string;
  grade: number;
  class_number: number;
}

const TeacherHome = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [mainClass, setMainClass] = useState<MainClass | null>(null);

  // 학급 정보
  useEffect(() => {
    const getMainClass = async () => {
      const { data, error } = await supabase
        .from("main_class_view")
        .select("school, grade, class_number")
        .eq("teacher_id", user?.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setMainClass(data);
      setLoading(false);
    };

    if (user) {
      getMainClass();
    }
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!mainClass)
    return (
      <View>
        <Text>학급이 없습니다.</Text>
        <Button onPress={signOut}>
          <Text>로그아웃</Text>
        </Button>
      </View>
    );

  return (
    <View>
      <Card>
        <CardHeader>
          <CardTitle>
            <Text>{mainClass.school}</Text>
          </CardTitle>
          <CardDescription>
            <Text>
              {mainClass.grade}학년 {mainClass.class_number}반
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Text>안녕하세요, {user?.email} 선생님!</Text>
        </CardContent>
      </Card>
    </View>
  );
};

export default TeacherHome;
