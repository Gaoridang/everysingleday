import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Ionicons } from "@expo/vector-icons";
import {
  ChecklistCreationProvider,
  useChecklistCreation,
} from "~/app/context/CheckListCreationContext";
import { useLocalSearchParams } from "expo-router";

const ChecklistForm = () => {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const { state, dispatch } = useChecklistCreation();
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const handleSubmit = () => {
    // TODO: Implement submission logic
    console.log(state);
  };

  console.log(classId);

  return (
    <ScrollView className="flex-1 p-4 bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Create Checklist
      </Text>

      <TextInput
        className="border border-gray-300 dark:border-gray-700 rounded p-2 mb-4 text-gray-800 dark:text-white"
        placeholder="Title"
        value={state.title}
        onChangeText={(text) => dispatch({ type: "SET_TITLE", payload: text })}
      />

      <TextInput
        className="border border-gray-300 dark:border-gray-700 rounded p-2 mb-4 text-gray-800 dark:text-white"
        placeholder="Description"
        value={state.description}
        onChangeText={(text) =>
          dispatch({ type: "SET_DESCRIPTION", payload: text })
        }
        multiline
      />

      <View className="flex-row items-center mb-4">
        <Text className="mr-2 text-gray-800 dark:text-white">
          Anonymous Evaluator:
        </Text>
        <Switch
          value={state.isPublic}
          onValueChange={(value) =>
            dispatch({ type: "SET_IS_PUBLIC", payload: value })
          }
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2 text-gray-800 dark:text-white">
          Scheduled Date:
        </Text>
        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <Text className="text-gray-800 dark:text-white">
            {state.scheduledAt.toDateString()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={openDatePicker}
          date={state.scheduledAt}
          onConfirm={(date) => {
            setOpenDatePicker(false);
            dispatch({ type: "SET_SCHEDULED_AT", payload: date });
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
          mode="date"
        />
      </View>

      <Text className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        Checklist Items
      </Text>
      {state.items.map((item, index) => (
        <View key={index} className="flex-row items-center mb-2">
          <TextInput
            className="flex-1 border border-gray-300 dark:border-gray-700 rounded p-2 mr-2 text-gray-800 dark:text-white"
            placeholder={`Item ${index + 1}`}
            value={item.description}
            onChangeText={(text) =>
              dispatch({
                type: "UPDATE_ITEM",
                payload: { index, description: text },
              })
            }
          />
          <TouchableOpacity
            onPress={() => dispatch({ type: "REMOVE_ITEM", payload: index })}
          >
            <Ionicons name="remove-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => dispatch({ type: "ADD_ITEM" })}
        className="mb-4"
      >
        <Text className="text-blue-500">+ Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 rounded p-2 items-center"
      >
        <Text className="text-white font-bold">Create Checklist</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const ChecklistCreationPage = () => (
  <ChecklistCreationProvider>
    <ChecklistForm />
  </ChecklistCreationProvider>
);

export default ChecklistCreationPage;
