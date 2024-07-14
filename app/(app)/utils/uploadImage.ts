import { decode } from "base64-arraybuffer";
import { supabase } from "~/app/utils/supabase";

export const uploadImageToSupabase = async (
  uri: string,
  userId: string,
  type?: string
) => {
  try {
    const ext = type ? type.split("/")[1] : "jpg";
    const path = `${userId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, decode(uri), {
        contentType: "image/jpeg",
      });

    if (error) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
      return "";
    } else {
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        avatar_url: data.publicUrl,
      });

      if (error) {
        alert("프로필 업데이트 중 오류가 발생했습니다.");
        return "";
      } else {
        return data.publicUrl;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return "";
  }
};
