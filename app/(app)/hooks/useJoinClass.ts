import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { router } from "expo-router";

interface JoinClassResult {
  success: boolean;
  message: string;
  class_id: string;
}

export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      inviteCode,
      studentNumber,
    }: {
      inviteCode: string;
      studentNumber: string;
    }) => {
      const { data, error } = await supabase.rpc(
        "join_class_with_invite_code",
        {
          p_invite_code: inviteCode,
          p_student_number: parseInt(studentNumber),
        }
      );

      if (error) {
        console.log("Error joining class:", error);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        queryClient.invalidateQueries({ queryKey: ["studentClasses"] });
        router.replace("/profile/index");
      } else {
        alert(data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      alert("An error occurred: " + error.message);
    },
  });
};
