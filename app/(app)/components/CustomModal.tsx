import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo 아이콘 사용을 가정

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButton?: {
    text: string;
    onPress: () => void;
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
  };
}

const CustomModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  message,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-lg p-6 w-5/6 max-w-sm">
              <TouchableOpacity
                onPress={onClose}
                className="absolute top-2 right-2"
                accessibilityLabel="Close modal"
              >
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>

              <Text className="text-xl font-bold mb-4">{title}</Text>
              <Text className="text-base mb-6">{message}</Text>

              <View className="flex-row justify-end">
                {secondaryButton && (
                  <TouchableOpacity
                    onPress={secondaryButton.onPress}
                    className="px-4 py-2 rounded-md mr-2"
                  >
                    <Text className="text-gray-600">
                      {secondaryButton.text}
                    </Text>
                  </TouchableOpacity>
                )}
                {primaryButton && (
                  <TouchableOpacity
                    onPress={primaryButton.onPress}
                    className="bg-blue-500 px-4 py-2 rounded-md"
                  >
                    <Text className="text-white font-semibold">
                      {primaryButton.text}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
