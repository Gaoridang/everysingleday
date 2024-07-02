import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthProvider";
import { decode } from "base64-arraybuffer";

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true, // base64 데이터를 얻기 위해 추가
    });

    if (
      !result.canceled &&
      result.assets[0].base64 &&
      result.assets[0].mimeType
    ) {
      setAvatar(result.assets[0].uri);
      uploadAvatar(result.assets[0].base64, result.assets[0].mimeType);
    }
  };

  const uploadAvatar = async (base64Image: string, mimeType: string | null) => {
    try {
      setUploading(true);

      const fileExt = mimeType ? mimeType.split("/")[1] : "png";

      const fileName = `avatar-${user?.id}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64Image), {
          contentType: `image/${fileExt}`,
        });

      if (error) throw error;

      const { data: publicURL } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { data: updateData, error: updateError } = await supabase
        .from("profiles")
        .upsert({ id: user?.id, avatar_url: publicURL.publicUrl });

      if (updateError) throw updateError;

      alert("Avatar uploaded successfully!");
    } catch (error) {
      if (error instanceof Error)
        console.error("Error uploading avatar:", error.message);
      alert("Error uploading avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity onPress={pickImage} disabled={uploading}>
        {avatar ? (
          <Image source={{ uri: avatar }} className="w-32 h-32 rounded-full" />
        ) : (
          <View className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center">
            <Text className="text-gray-500">Select Avatar</Text>
          </View>
        )}
      </TouchableOpacity>
      {uploading && <Text className="mt-4">Uploading...</Text>}
    </View>
  );
};

export default AvatarUpload;
