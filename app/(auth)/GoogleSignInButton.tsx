import React, { useState } from "react";
import { Button as RNButton } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "../utils/supabase";
import { useRouter } from "expo-router";
import LinkButton from "../(app)/components/ActionButton";
import Button from "../(app)/components/Button";
import { AntDesign } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleSignIn(id_token);
    }
  }, [response]);

  async function handleSignIn(idToken: string) {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });
      if (error) throw error;
      // 여기에 로그인 성공 후 처리 로직을 추가하세요 (예: 홈 화면으로 이동)
      router.replace("/");
    } catch (error) {
      console.error("Error signing in:", error);
      // 여기에 에러 처리 로직을 추가하세요
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onPress={() => promptAsync()}
        text="Google로 로그인"
        disabled={!request || isLoading}
        icon={
          <AntDesign
            name="google"
            size={24}
            color="black"
            style={{ marginRight: 8 }}
          />
        }
      />
    </>
  );
}
