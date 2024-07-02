import { supabase } from "./supabase";

export const getMainClassId = async (
  userId: string,
  role: "teachers" | "students" | "parents" = "teachers"
) => {
  if (!userId) throw new Error("userId is required");

  const { data, error } = await supabase
    .from(role)
    .select("main_class_id")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.main_class_id || "";
};
