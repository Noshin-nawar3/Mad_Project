import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import your screens here
import School from "../app/(app)/school";
import Resources from "../app/(app)/resources";
import Home from "../app/(app)/home";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "School") iconName = "school-outline";
          else if (route.name === "Resources") iconName = "book-outline";
          else if (route.name === "Home") iconName = "home-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="School" component={School} />
      <Tab.Screen name="Resources" component={Resources} />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
