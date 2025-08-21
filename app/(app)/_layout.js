import { Stack } from "expo-router";
import HomeHeader from "../../components/HomeHeader";
import { BookmarkProvider } from "./BookmarkContext";
// Change this:

// To this (adjust the path based on your folder structure):
export default function _layout() {
  return (
    <BookmarkProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Stack.Screen name="connect" options={{ title: "Connect Child" }} />
    </BookmarkProvider>
  )
  // return <Stack />;
}

/*

*/