import React, { forwardRef, useRef, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { cn } from "~/lib/utils";

interface Props extends TextInputProps {
  className?: string;
  inputClassName?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconAction?: () => void;
}

const CTextInput = ({
  className,
  inputClassName,
  errorMessage,
  leftIcon,
  rightIcon,
  rightIconAction,
  ...props
}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <View
        className={cn(
          isFocused ? "border-black" : "border-gray-300",
          "flex-row justify-between items-center mb-2 border-b transition-colors",
          className
        )}
      >
        <View className="flex-1 flex-row items-center">
          {leftIcon && <View className="pl-2 pr-1">{leftIcon}</View>}
          <TextInput
            ref={inputRef}
            className={cn(
              "flex-1 text-base text-slate-800 py-3 px-2",
              !leftIcon && "pl-0",
              !rightIcon && "pr-0",
              inputClassName
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </View>
        {rightIcon && (
          <Pressable onPress={rightIconAction} className={cn("pr-2 pl-1")}>
            {rightIcon}
          </Pressable>
        )}
      </View>
      {errorMessage && (
        <Text className="text-red-500 text-sm">{errorMessage}</Text>
      )}
    </View>
  );
};

CTextInput.displayName = "CTextInput";

export default CTextInput;
