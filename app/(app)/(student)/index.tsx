import React from "react";
import { Text } from "react-native";
import { ScreenWrapper } from "../components/Container";
import { useStudentInfo } from "../hooks/useStudentInfo";
import { useAuth } from "~/app/context/AuthProvider";

const StudentDashboard = () => {
  // 학급 정보, 진행 중인 체크리스트, 완료한 평가, 미완료한 평가 등을 보여줍니다.
  const { user } = useAuth();
  const { data, isLoading, error } = useStudentInfo(user?.id);

  if (isLoading || !data) {
    return (
      <ScreenWrapper>
        <Text>Loading...</Text>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <Text>Error: {error.message}</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <Text>
        {data.school} {data.grade}학년 {data.class_number}반
      </Text>
      <Text>담임 선생님: {data.teacher_name}</Text>
    </ScreenWrapper>
  );
};

export default StudentDashboard;
