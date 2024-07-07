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

export const useChecklistResultDetail = (checklistId: string) => {
  return useQuery({
    queryKey: ["checklist-result-detail", checklistId],
    queryFn: async () => {
      // 체크리스트 기본 정보 및 응답 정보 가져오기
      const { data: checklistData, error: checklistError } = await supabase
        .from("student_class_checklist_results")
        .select("*")
        .eq("checklist_id", checklistId)
        .single();

      if (checklistError) throw checklistError;

      // 체크리스트 항목 및 응답 가져오기
      const { data: itemsData, error: itemsError } = await supabase
        .from("checklist_items")
        .select(
          `
          id,
          description,
          checklist_item_responses (
            response
          )
        `
        )
        .eq("checklist_id", checklistId);

      if (itemsError) throw itemsError;

      // 데이터 구조화
      const items = itemsData.map((item) => ({
        id: item.id,
        description: item.description,
        response: item.checklist_item_responses[0]?.response || false,
      }));

      return {
        ...checklistData,
        items,
      };
    },
  });
};
