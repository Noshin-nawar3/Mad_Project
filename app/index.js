import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StartPage() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 24 }}>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ VERY IMPORTANT: makes the view fill the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
