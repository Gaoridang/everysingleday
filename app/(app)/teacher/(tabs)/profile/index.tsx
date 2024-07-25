import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import LinkButton from "~/app/(app)/components/ActionButton";
import ClassInfo from "~/app/(app)/components/ClassInfo";
import { useProfile } from "~/app/(app)/hooks/useProfile";
import { useAuth } from "~/app/context/AuthProvider";
import ImageUpload from "~/app/onboarding/ImageUpload";

const TeacherAccount = () => {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id);

  return (
    <View className="gap-6">
      <View className="relative gap-4 justify-center items-center">
        <View>
          {profile?.avatar_url ? (
            <ImageUpload currentAvatarUrl={profile.avatar_url} />
          ) : (
            <View className="w-24 h-24 bg-slate-400 rounded-full items-center justify-center">
              <Text className="text-gray-500">사진 선택</Text>
            </View>
          )}
        </View>
        <View>
          <Text className="text-center text-2xl font-semibold">
            {profile?.name}
          </Text>
          <Text className="text-center text-base">{profile?.email}</Text>
          <LinkButton href="/teacher/profile/editModal" text="프로필 수정" />
        </View>
      </View>
      <ClassInfo role="teacher" />
      <View className="grid grid-cols-2">
        <LinkButton
          variant="secondary"
          className="col-span-1"
          href="/teacher/profile/ClassListScreen"
          text="학급 목록"
        />
        <LinkButton
          className="col-span-1"
          href="/teacher/CreateClassScreen"
          text="학급 만들기"
        />
      </View>
      {/* 로그아웃 */}
      <TouchableOpacity onPress={signOut}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeacherAccount;
