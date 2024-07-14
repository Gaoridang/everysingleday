import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { supabase } from "~/app/utils/supabase";

type CreateClassMutation = {
  school: string;
  grade: string;
  classNumber: string;
};

type ClassList = {
  school: string;
  grade: number;
  class_number: number;
  teacher_name: string;
  class_id: string;
};

export const useGetClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_user_classes");

      if (error) {
        throw error;
      } else {
        return data as ClassList[];
      }
    },
  });
};

export const useGetMainClass = (userId?: string) => {
  return useQuery({
    queryKey: ["main_class"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("class_members")
        .select("class_id")
        .eq("profile_id", userId!)
        .eq("is_primary", true)
        .maybeSingle();

      if (error) {
        throw error;
      } else {
        return data;
      }
    },
    enabled: !!userId,
  });
};

export const useGetClassById = (classId?: string) => {
  return useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("id,school, grade, class_number")
        .eq("id", classId!)
        .single();

      if (error) {
        throw error;
      } else {
        return data;
      }
    },
    enabled: !!classId,
  });
};

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  const createClass = useMutation({
    mutationFn: async ({ school, grade, classNumber }: CreateClassMutation) => {
      const { data, error } = await supabase.rpc(
        "create_and_set_primary_class",
        {
          p_school: school,
          p_grade: parseInt(grade),
          p_class_number: parseInt(classNumber),
          p_year: new Date().getFullYear(),
        }
      );

      if (error) {
        throw error;
      } else {
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      router.replace("/teacher/profile/ClassListScreen");
    },
  });

  return createClass;
};
