// Example: screens/CourseScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourseScreen = () => (
  <View style={styles.container}>
    <Text
      // onPress={()=>navigation.navigate('Course')}
    >Course Screen</Text>
  </View>
  
);

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

export default CourseScreen;

/*
import React from "react";
import { ScrollView, View } from "react-native";
import CourseCard from "../../components/CourseCard";

export default function CoursesScreen() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <CourseCard
        image="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
        title="React Native for Beginners"
        description="Learn how to build cross-platform mobile apps using React Native and Expo."
        length="5h 30m"
        rating="4.8"
        onFavoriteToggle={(fav) => console.log("Favorite status:", fav)}
      />
      <CourseCard
        image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
        title="Advanced JavaScript"
        description="Master closures, async programming, and advanced concepts."
        length="3h 45m"
        rating="4.6"
      />
    </ScrollView>
  );
}

*/