import React from "react";
import { FlatList, Text, View } from "react-native";
import { useGetClasses } from "../hooks/useUserClass";

const ClassList = () => {
  const { data, isLoading, error } = useGetClasses();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.class_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.school}</Text>
            <Text>
              {item.grade}학년 {item.class_number}반
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ClassList;
