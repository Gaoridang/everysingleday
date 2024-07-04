import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";

interface Props {
  href: string;
  text: string;
  className?: string;
  variant?: "primary" | "secondary";
}

const LinkButton = ({ href, text, className, variant = "primary" }: Props) => {
  const color = variant === "primary" ? "bg-gray-700" : "bg-white";
  const border = variant === "primary" ? "" : "border border-gray-700";
  const textColor = variant === "primary" ? "text-white" : "text-black";

  return (
    <Link href={href} asChild>
      <TouchableOpacity
        className={cn(
          "py-3 px-4 items-center my-1 rounded-md active:scale-95",
          color,
          border,
          className
        )}
      >
        <Text className={cn(textColor, "font-bold")}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default LinkButton;
