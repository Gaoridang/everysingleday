import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "~/app/context/AuthProvider";
import { supabase } from "~/app/utils/supabase";

interface ClassProps {
  school: string;
  grade: number;
  class_number: number;
  class_id: string;
}

const classListModal = () => {
  const { user } = useAuth();
  const [classList, setClassList] = useState<ClassProps[]>([]);

  useEffect(() => {
    const fetchClassList = async () => {
      const { data, error } = await supabase
        .from("student_classes_view")
        .select("school, grade, class_number, class_id")
        .eq("profile_id", user?.id);

      if (error) {
        console.error("Error fetching class list:", error);
      } else {
        setClassList(data);
      }
    };

    if (user) {
      fetchClassList();
    }
  }, []);

  return (
    <View>
      <FlatList
        data={classList}
        keyExtractor={(item) => item.class_id}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>
                {item.school} {item.grade}학년 {item.class_number}반
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default classListModal;
