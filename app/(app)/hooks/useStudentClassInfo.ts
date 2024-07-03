import { supabase } from "~/app/utils/supabase";

const fetchStudentClassInfo = async (studentId: string) => {
  const { data, error } = await supabase
    .from("class_members")
    .select(
      `
      class_id,
      classes (
        school,
        grade,
        class_number,
        created_by (name)
      `
    )
    .eq("profile_id", studentId);
};
