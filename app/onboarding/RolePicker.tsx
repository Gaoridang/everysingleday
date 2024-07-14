import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { cn } from "~/lib/utils";

const roles = [
  { label: "학생", value: "student" },
  { label: "선생님", value: "teacher" },
  { label: "부모님", value: "parent" },
];

interface Props {
  selectedRole: string;
  onSelect: (role: string) => void;
}

const RolePicker = ({ onSelect, selectedRole }: Props) => {
  return (
    <View>
      {roles.map((role) => (
        <TouchableOpacity
          className={cn(
            selectedRole === role.value ? "bg-blue-400" : "bg-gray-100"
          )}
          key={role.value}
          onPress={() => onSelect(role.value)}
        >
          <Text>{role.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RolePicker;
