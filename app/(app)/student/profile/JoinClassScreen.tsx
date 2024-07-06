import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import { useJoinClass } from "../../hooks/useJoinClass";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const CodeInput = ({
  code,
  setCode,
  hasError,
}: {
  code: string;
  setCode: (code: string) => void;
  hasError: boolean;
}) => {
  const inputRefs = useRef<TextInput[] | null>([]);
  const shake = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shake.value }],
    };
  });

  useEffect(() => {
    if (hasError) {
      shake.value = withSpring(10, { damping: 2, stiffness: 300 });
      setTimeout(() => {
        shake.value = withSpring(0);
      }, 500);
    }
  }, [hasError]);

  const handleCodeChange = (text: string, index: number) => {
    if (!inputRefs.current) return;
    let newCode = code.split("");

    // Check if it's a paste event (sudden input of 6 characters)
    if (text.length === 6 && index === 0) {
      newCode = text.toUpperCase().split("");
      setCode(newCode.join(""));
      inputRefs.current[5].focus();
    } else {
      newCode[index] = text.toUpperCase();
      setCode(newCode.join(""));
      if (text && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <Animated.View
      style={animatedStyle}
      className="flex-row justify-between mb-4"
    >
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className={`w-12 h-14 border ${
            hasError ? "border-red-500" : "border-gray-300"
          } rounded-md text-center`}
          maxLength={1}
          value={code[index] || ""}
          onChangeText={(text) => handleCodeChange(text, index)}
          keyboardType="default"
          autoCapitalize="characters"
          accessibilityLabel={`Invite code digit ${index + 1}`}
        />
      ))}
    </Animated.View>
  );
};

const JoinClass = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [error, setError] = useState("");
  const joinClassMutation = useJoinClass();

  const handleJoinClass = () => {
    if (inviteCode.length !== 6 || !studentNumber) {
      setError("Please enter a valid 6-digit invite code and student number");
      AccessibilityInfo.announceForAccessibility("Error: " + error);
      return;
    }
    setError("");
    joinClassMutation.mutate({ inviteCode, studentNumber });
  };

  return (
    <View className="p-6">
      <Text className="text-2xl font-bold mb-6">Join a Class</Text>

      <Text className="text-lg font-semibold mb-2">Invite Code</Text>
      <CodeInput code={inviteCode} setCode={setInviteCode} hasError={!!error} />

      <Text className="text-lg font-semibold mb-2">Student Number</Text>
      <TextInput
        className={`h-14 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md px-4 mb-6`}
        placeholder="Enter your student number"
        value={studentNumber}
        onChangeText={(text) => setStudentNumber(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        accessibilityLabel="Student number input"
        accessibilityHint="Enter your student number"
      />

      {error && (
        <Text className="text-red-500 mb-4" accessibilityLive="polite">
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleJoinClass}
        disabled={joinClassMutation.isPending}
        className={`py-4 rounded-md ${
          joinClassMutation.isPending ? "bg-gray-400" : "bg-blue-500"
        }`}
        accessibilityRole="button"
        accessibilityLabel="Join Class"
        accessibilityHint="Double tap to join the class with the provided invite code and student number"
      >
        <Text className="text-white text-center text-lg font-semibold">
          {joinClassMutation.isPending ? "Joining..." : "Join Class"}
        </Text>
      </TouchableOpacity>

      {joinClassMutation.isPending && (
        <Text className="text-center mt-4" accessibilityLive="polite">
          Joining class...
        </Text>
      )}
    </View>
  );
};

export default JoinClass;
