import "./../globals.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </ConvexProvider>
  );
}
