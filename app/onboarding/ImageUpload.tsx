import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { cn } from "~/lib/utils";
import { uploadImageToSupabase } from "../(app)/utils/uploadImage";
import { useAuth } from "../context/AuthProvider";

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarChange?: (newPath: string) => void;
  type?: "profile" | "register";
}

const ImageUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  onAvatarChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setUrl(result.assets[0].uri);
      setUploading(true);
      await uploadImageToSupabase(
        result.assets[0].base64,
        user?.id ?? "",
        result.assets[0].mimeType
      );

      setUploading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className={cn(
          "relative justify-center items-center w-24 h-24 rounded-full",
          uploading && "opacity-50"
        )}
      >
        {/* Loading amination */}
        {uploading && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 justify-center items-center rounded-full">
            <Text className="text-white">업로드 중...</Text>
          </View>
        )}
        {currentAvatarUrl ? (
          <Image
            source={{ uri: currentAvatarUrl }}
            className="w-24 h-24 rounded-full"
          />
        ) : url ? (
          <Image source={{ uri: url }} className="w-24 h-24 rounded-full" />
        ) : (
          <View className="w-24 h-24 bg-slate-400 rounded-full items-center justify-center">
            <Text className="text-gray-500">사진 선택</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;
