import { useQuery } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email, role, avatar_url")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        throw new Error(error.message);
      } else {
        return data;
      }
    },
  });
};
