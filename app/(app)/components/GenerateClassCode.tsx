import { Alert, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "~/app/utils/supabase";
import { useClass } from "~/app/context/ClassProvider";

const GenerateClassCode = () => {
  // generate random six character + number code
  const [classCode, setClassCode] = React.useState("");
  const { currentClassId } = useClass();
  const generate = useMutation({
    mutationFn: async ({ currentClassId }: { currentClassId: string }) => {
      const { data, error } = await supabase.rpc("generate_invite_code", {
        p_class_id: currentClassId,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return [];
      } else {
        return data;
      }
    },
    onSuccess: (data) => {
      setClassCode(data[0].code);
      // FIX: Clipboard is not working
      navigator.clipboard.writeText(data[0].code);
      Alert.alert("성공", "학급 코드가 복사되었습니다.");
    },
  });

  const onPress = async () => {
    if (!currentClassId) {
      Alert.alert("Error", "No class selected");
      return;
    }

    generate.mutate({ currentClassId });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-yellow-300 py-2 px-3 rounded-full"
    >
      <Text className="text-sm font-semibold">
        {classCode ? classCode : "코드 생성"}
      </Text>
    </TouchableOpacity>
  );
};

export default GenerateClassCode;
