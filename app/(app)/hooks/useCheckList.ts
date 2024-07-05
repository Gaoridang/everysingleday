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
        .order("scheduled_at", { ascending: false });

      if (error) {
        console.error("Error fetching checklists:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
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
        .select("*")
        .eq("class_id", classId)
        .eq("scheduled_at", formattedToday);

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
          p_scheduled_at: checklist.scheduledAt,
          p_items: checklist.items,
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
