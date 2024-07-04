import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";
import { useAuth } from "./AuthProvider";

interface ClassContextType {
  currentClassId: string | null;
  setCurrentClassId: (classId: string) => Promise<void>;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) {
    throw new Error("useClass must be used within a ClassProvider");
  }
  return context;
};

export const ClassProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentClassId, setCurrentClassId] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadLastViewedClass();
  }, [user]);

  const loadLastViewedClass = async () => {
    try {
      const lastViewedClassId = await AsyncStorage.getItem("lastViewedClassId");
      if (lastViewedClassId) {
        setCurrentClassId(lastViewedClassId);
      } else {
        const mainClass = await fetchMainClass();
        if (mainClass) {
          setCurrentClassId(mainClass.class_id);
        }
      }
    } catch (error) {
      console.error("Error loading last viewed class:", error);
    }
  };

  const fetchMainClass = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("class_members")
      .select("class_id")
      .eq("profile_id", user.id)
      .eq("is_primary", true)
      .single();

    if (error) {
      console.error("Error fetching main class:", error);
      return null;
    }
    return data;
  };

  const setCurrentClassIdAndSave = async (classId: string) => {
    setCurrentClassId(classId);
    await AsyncStorage.setItem("lastViewedClassId", classId);
  };

  return (
    <ClassContext.Provider
      value={{
        currentClassId,
        setCurrentClassId: setCurrentClassIdAndSave,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
