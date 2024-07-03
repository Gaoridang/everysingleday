import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabase";
import { router } from "expo-router";

interface AuthProps {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: User | null;
  userRole: string | null;
  signOut: () => Promise<void>;
  checkUserRole: () => Promise<void>;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          await handleSignIn(
            session?.user ?? null,
            session?.access_token ?? ""
          );
        } else if (event === "SIGNED_OUT") {
          await handleSignOut();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await handleSignIn(user, userToken);
        } else {
          await handleSignOut();
        }
      } else {
        await handleSignOut();
      }
    } catch (error) {
      console.error("Error checking user:", error);
      await handleSignOut();
    }
  }

  async function handleSignIn(user: User | null, token: string) {
    console.log("Handling sign in");
    setIsAuthenticated(true);
    setUser(user);
    await AsyncStorage.setItem("userToken", token);
    const role = await checkUserRole(user);
    setUserRole(role);
    setIsLoading(false);
    console.log("Sign in complete. New state:", {
      isAuthenticated: true,
      user,
      userRole: role,
    });
  }

  async function handleSignOut() {
    console.log("Handling sign out");
    setIsAuthenticated(false);
    setUser(null);
    setUserRole(null);
    await AsyncStorage.removeItem("userToken");
    setIsLoading(false);
    console.log("Sign out complete. New state:", {
      isAuthenticated: false,
      user: null,
      userRole: null,
    });
    router.replace("/(auth)");
  }

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    await handleSignOut();
  };

  const checkUserRole = async (user: User | null) => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
          return null;
        } else {
          return data?.role || null;
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        userRole,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
