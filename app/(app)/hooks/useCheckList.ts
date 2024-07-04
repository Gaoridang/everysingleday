import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";

export const useGetCheckLists = (classId: string) => {
  return useQuery({
    queryKey: ["checklists", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checklists")
        .select("*")
        .eq("class_id", classId);
    },
  });
};

export const useCreateCheckList = () => {
  return useMutation({
    mutationFn: async (checklist: any) => {
      const { data, error } = await supabase
        .from("checklists")
        .insert(checklist);
      if (error) {
        console.error("Error creating checklist:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};
