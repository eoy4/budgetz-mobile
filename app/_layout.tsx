import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemedText } from "@/components/ThemedText";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "@/config/firebase";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  if (loading) {
    return null;
  }

  console.log("user", !!user);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack key={!!user ? "auth-stack" : "non-auth-stack"}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState<User | null>(null);
  const [uniqueKey1, setUniqueKey1] = useState<string>("");
  const [uniqueKey2, setUniqueKey2] = useState<string>("");

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUniqueKeys();
    });
  }, []);

  const setUniqueKeys = () => {
    console.log("setting unique keys");
    const uniqueKey1 = Math.random().toString();
    const uniqueKey2 = Math.random().toString();
    setUniqueKey1(uniqueKey1);
    setUniqueKey2(uniqueKey2);
    console.log("uniqueKey1", uniqueKey1);
    console.log("uniqueKey2", uniqueKey2);
  };

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider key={"auth-key" + (user ? uniqueKey1 : uniqueKey2)}>
      <RootLayoutNav key={"root-key" + (user ? uniqueKey1 : uniqueKey2)} />
    </AuthProvider>
  );
}
