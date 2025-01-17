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
import { auth } from '@/config/firebase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  if (loading) {
    return null;
  }

  console.log('user', !!user);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {!!user ? (
        // Authenticated stack
        <Stack key="auth-stack">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        // Non-authenticated stack
        <Stack key="non-auth-stack">
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [uniqueKey1, setUniqueKey1] = useState<string>('');
  const [uniqueKey2, setUniqueKey2] = useState<string>('');

  useEffect(() => {
    console.log('setting unique keys');
    setUniqueKey1(Math.random().toString());
    setUniqueKey2(Math.random().toString());
  }, [user]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider key="asdsa">
      <RootLayoutNav />
    </AuthProvider>
  );
}
