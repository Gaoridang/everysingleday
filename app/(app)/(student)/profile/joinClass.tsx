import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";
import { useJoinClass } from "../../hooks/useJoinClass";

const joinClass = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const { user } = useAuth();
  const joinClassMutation = useJoinClass(user?.id, inviteCode, studentNumber);

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

export default joinClass;
