import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
  className?: string;
}

const Button = ({ text, onPress, className, icon, ...props }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        "border flex-row justify-center items-center p-4 rounded-full",
        className
      )}
      {...props}
    >
      {icon && icon}
      <Text className="text-base">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
