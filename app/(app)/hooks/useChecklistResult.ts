import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";

export const useChecklistResult = (checklistId: string) => {
  return useQuery({
    queryKey: ["checklistResult", checklistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checklist_responses")
        .select(
          `
          id,
          status,
          checklist:checklists (
            id,
            title,
            description
          ),
          items:checklist_item_responses (
            id,
            response,
            checklist_item:checklist_items (
              id,
              description
            )
          )
        `
        )
        .eq("id", checklistId)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
