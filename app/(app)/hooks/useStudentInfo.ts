import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";

export const useStudentInfo = (studentId?: string) => {
  return useQuery({
    queryKey: ["student", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_dashboard_view")
        .select("school, grade, class_number, teacher_name")
        .eq("student_id", studentId)
        .single();

      if (error) {
        console.error("Error fetching student info:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};
