import React from "react";
import { View, Text, Dimensions } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { useAuth } from "~/app/context/AuthProvider";
import { LineChart } from "react-native-chart-kit";
import { useClass } from "~/app/context/ClassProvider";

const Statistics = () => {
  const { user } = useAuth();
  const { currentClassId } = useClass();
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ["statistics", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_dashboard")
        .select("*")
        .eq("student_id", user?.id!)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const { data: achievementData, isLoading: isChartLoading } = useQuery({
    queryKey: ["daily-completions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("class_self_checklist_achievement")
        .select("*")
        .eq("student_id", user?.id!)
        .eq("class_id", currentClassId!)
        .order("check_date", { ascending: true });

      if (error) throw error;

      if (!data) return [];

      return data.map((item) => ({
        date: item.check_date,
        totalItems: item.total_items,
        completedItems: item.completed_items,
        achievementRate: item.achievement_rate,
      }));
    },
  });

  if (isDashboardLoading) {
    return <Text>Loading...</Text>;
  }

  if (isChartLoading) return <Text>Chart Loading...</Text>;

  if (!achievementData || achievementData.length === 0)
    return <Text>No data available</Text>;

  const chartData = {
    labels: achievementData.map((item) =>
      new Date(item.date!).toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        data: achievementData.map((item) => item.achievementRate || 0),
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View>
      <View className="flex-row gap-4 mb-4">
        <View className="flex-1 flex-row items-center p-4 rounded-lg bg-slate-100">
          <Text>달성률 {dashboardData?.achievement_rate}%</Text>
        </View>
        <View className="flex-1 flex-row p-4 rounded-lg bg-slate-100">
          <Text>{dashboardData?.streak_days}일 연속</Text>
        </View>
      </View>

      <Text className="text-lg font-bold mb-2">일일 완료 체크리스트</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        fromZero
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Statistics;
