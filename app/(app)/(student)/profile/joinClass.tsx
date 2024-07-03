import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useJoinClass } from "../../hooks/useJoinClass";

const joinClass = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const joinClassMutation = useJoinClass(inviteCode, studentNumber);

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
