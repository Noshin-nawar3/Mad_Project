// Example: screens/SchoolScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SchoolScreen = () => (
  <View style={styles.container}>
    <Text>School Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

export default SchoolScreen;
