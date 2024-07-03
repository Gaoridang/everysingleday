import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";
import { useMutation } from "@tanstack/react-query";

const JoinClassComponent = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const { user } = useAuth();

  const joinClassMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("join_class", {
        p_profile_id: user?.id,
        p_invite_code: inviteCode,
        p_student_number: studentNumber,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        // 성공 후 처리 (예: 대시보드로 이동)
      } else {
        alert(data.message);
      }
    },
    onError: (error) => {
      alert("An error occurred: " + error.message);
    },
  });

  const handleJoinClass = () => {
    if (!inviteCode || !studentNumber) {
      alert("Please enter both invite code and student number");
      return;
    }
    joinClassMutation.mutate();
  };

  return (
    <View>
      <TextInput
        placeholder="Invite Code"
        value={inviteCode}
        onChangeText={setInviteCode}
      />
      <TextInput
        placeholder="Student Number"
        value={studentNumber}
        onChangeText={setStudentNumber}
      />
      <Button
        title="Join Class"
        onPress={handleJoinClass}
        disabled={joinClassMutation.isPending}
      />
      {joinClassMutation.isPending && <Text>Joining class...</Text>}
    </View>
  );
};

export default JoinClassComponent;
