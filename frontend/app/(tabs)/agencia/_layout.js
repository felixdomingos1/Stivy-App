import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="postaragencia" />
      <Stack.Screen name="todasagencias" />
      <Stack.Screen name="minhaagencia" />
    </Stack>
  );
}
