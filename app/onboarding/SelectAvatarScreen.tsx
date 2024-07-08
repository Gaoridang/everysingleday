import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../utils/supabase";

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarChange: (newPath: string, newUrl: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatarUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [newAvatarUri, setNewAvatarUri] = useState("");
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      changeAvatar(
        result.assets[0].base64,
        result.assets[0].type || "image/png"
      );
    }
  };

  const changeAvatar = async (base64Image: string, mimeType: string) => {
    try {
      setUploading(true);
      if (!user?.id) throw new Error("User not found");

      const fileExt = mimeType.split("/")[1];
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64Image), {
          contentType: mimeType,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setNewAvatarUri(data.publicUrl);

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({ id: user.id, avatar_url: data.publicUrl });

      if (updateError) alert("프로필 업데이트 중 오류가 발생했습니다.");

      console.log("Avatar uploaded successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className={`${uploading && "opacity-50"}`}
      >
        {newAvatarUri ? (
          <Image
            source={{ uri: newAvatarUri }}
            className="w-32 h-32 rounded-full"
          />
        ) : currentAvatarUrl ? (
          <Image
            source={{ uri: currentAvatarUrl }}
            className="w-32 h-32 rounded-full"
          />
        ) : (
          <View className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center">
            <Text className="text-gray-500">프로필 사진 선택</Text>
          </View>
        )}
      </TouchableOpacity>
      {uploading && <Text className="mt-4">Uploading...</Text>}
    </View>
  );
};

export default AvatarUpload;
