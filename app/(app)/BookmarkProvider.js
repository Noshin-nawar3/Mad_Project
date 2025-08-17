import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookmarkProvider } from "./BookmarkContext";

import CoursesPage from "./CoursesPage";
import Bookmark from "./bookmark";
import CourseDetails from "./courseDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <BookmarkProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Courses" component={CoursesPage} />
          <Stack.Screen name="Bookmarks" component={Bookmark} />
          <Stack.Screen name="CourseDetails" component={CourseDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookmarkProvider>
);
}
