import { Stack } from "expo-router";
import HomeHeader from "../../components/HomeHeader";
// Change this:

// To this (adjust the path based on your folder structure):
export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown : false
      }}
    />
  )
  // return <Stack />;
}


/*

*/