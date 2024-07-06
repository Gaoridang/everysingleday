import { View, Text } from "react-native";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { useAuth } from "~/app/context/AuthProvider";

const Statistics = () => {
  const { user } = useAuth();
  const update = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from("checklists")
        .update({ status: "completed" })
        .eq("student_id", user?.id);

      if (error) {
        console.error("Error updating checklist status:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
    onSuccess: () => {
      alert("Checklist updated");
    },
  });

  return (
    <View>
      <Text>Statistics</Text>
    </View>
  );
};

export default Statistics;
