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
