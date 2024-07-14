import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { router } from "expo-router";

interface ChecklistItem {
  description: string;
  order_num: number;
}

interface Checklist {
  title: string;
  description: string;
  isPublic: boolean;
  scheduledAt: Date;
  checklist_type: "teacher" | "student";
  items: ChecklistItem[];
}

export const useGetCheckLists = (classId: string) => {
  return useQuery({
    queryKey: ["checklists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checklists")
        .select("*")
        .eq("class_id", classId)
        .order("scheduled_at", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching checklists:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
    enabled: !!classId,
  });
};

export const useGetTodayCheckLists = (classId: string | null) => {
  const today = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60 * 1000
  );
  const formattedToday = today.toISOString().split("T")[0];

  return useQuery({
    queryKey: ["todayChecklists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checklists")
        .select("id, title, description, scheduled_at, status")
        .eq("class_id", classId!)
        .eq("scheduled_at", formattedToday)
        .order("scheduled_at", { ascending: false });

      if (error) {
        console.error("Error fetching today's checklists:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
    enabled: !!classId,
  });
};

export const useGetMyCheckLists = (classId: string | null, userId?: string) => {
  return useQuery({
    queryKey: ["checklists", classId, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_class_checklist_results_view")
        .select("*")
        .eq("checklist_creator_id", userId!)
        .eq("class_id", classId!);

      if (error) {
        console.error("Error fetching my checklists:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
    enabled: !!userId && !!classId,
  });
};

export const useUpdateChecklistStatus = () => {
  return useMutation({
    mutationFn: async ({
      status,
      checklistId,
    }: {
      status: "draft" | "active" | "completed";
      checklistId: string;
    }) => {
      const { data, error } = await supabase
        .from("checklists")
        .update({ status })
        .eq("id", checklistId);

      if (error) {
        console.error("Error updating checklist status:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};

export const useCreateCheckList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      checklist,
    }: {
      classId: string;
      checklist: Checklist;
    }) => {
      const { data, error } = await supabase.rpc(
        "create_checklist_with_items",
        {
          p_class_id: classId,
          p_title: checklist.title,
          p_description: checklist.description,
          p_is_public: checklist.isPublic,
          p_checklist_type: checklist.checklist_type,
          p_scheduled_at: checklist.scheduledAt as any,
          p_items: checklist.items as any,
        }
      );

      if (error) {
        console.error("Error creating checklist:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklists"] });
      router.replace(`/(teacher)/checklists`);
    },
  });
};

export const useGetChecklistItems = (checklistId: string) => {
  return useQuery({
    queryKey: ["checklistItems", checklistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("checklist_items")
        .select("*")
        .eq("checklist_id", checklistId);

      if (error) {
        console.error("Error fetching checklist items:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};

export const useUpdateStudentChecklistResponse = () => {
  return useMutation({
    mutationFn: async ({
      checklistId,
      evaluatedId,
      itemResponses,
    }: {
      checklistId: string;
      evaluatedId: string;
      itemResponses: { item_id: string; response: string }[];
    }) => {
      const { data, error } = await supabase.rpc(
        "update_student_checklist_response",
        {
          p_checklist_id: checklistId,
          p_evaluated_id: evaluatedId,
          p_item_responses: itemResponses,
        }
      );

      if (error) {
        console.error("Error updating checklist item:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};
