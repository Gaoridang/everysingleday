import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthProvider";
import { ScreenWrapper } from "../components/Container";

interface DashboardData {
  teacher_id: string;
  class_id: string;
  school: string;
  grade: number;
  class_number: number;
  total_students: number;
  active_checklist_id: string;
  active_checklist_title: string;
  completed_evaluations: number;
  pending_evaluations: number;
}

interface PendingStudent {
  student_id: string;
  student_name: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    fetchPendingStudents();
  }, []);

  const fetchDashboardData = async () => {
    const { data, error } = await supabase
      .from("teacher_dashboard")
      .select("*")
      .eq("teacher_id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching dashboard data:", error);
    } else {
      setDashboardData(data);
    }
    setLoading(false);
  };

  const fetchPendingStudents = async () => {
    const { data, error } = await supabase
      .from("pending_evaluations")
      .select("student_id, student_name");

    if (error) {
      console.error("Error fetching pending students:", error);
    } else {
      setPendingStudents(data);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">데이터를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const totalStudents = dashboardData.total_students || 1; // total_students가 0인 경우를 방지하기 위해 1로 설정
  const completionRate =
    (dashboardData.completed_evaluations / totalStudents) * 100;

  return (
    <ScreenWrapper>
      <Text className="text-2xl font-bold mb-4">
        {dashboardData.school} {dashboardData.grade}학년{" "}
        {dashboardData.class_number}반
      </Text>

      <View className="bg-white rounded-lg shadow p-4 mb-4">
        <Text className="text-lg font-semibold mb-2">현재 체크리스트</Text>
        <Text className="mb-2">{dashboardData.active_checklist_title}</Text>
        <Text className="mb-2">
          전체 학생: {dashboardData.total_students}명
        </Text>
        <Text className="mb-2">
          평가 완료: {dashboardData.completed_evaluations}명
        </Text>
        <Text className="mb-4">
          평가 미완료: {dashboardData.pending_evaluations}명
        </Text>

        <Text className="mb-2">완료율: {completionRate.toFixed(1)}%</Text>
        <View className="bg-gray-200 h-4 rounded-full">
          <View
            className="bg-blue-500 h-full rounded-full"
            style={{ width: `${completionRate}%` }}
          />
        </View>
      </View>

      <View className="bg-white rounded-lg shadow p-4">
        <Text className="text-lg font-semibold mb-2">미완료 학생 목록</Text>
        {pendingStudents.length > 0 ? (
          <FlatList
            data={pendingStudents}
            keyExtractor={(item) => item.student_id}
            renderItem={({ item }) => (
              <Text className="py-2 border-b border-gray-200">
                {item.student_name}
              </Text>
            )}
          />
        ) : (
          <Text>모든 학생이 평가를 완료했습니다.</Text>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default TeacherDashboard;
