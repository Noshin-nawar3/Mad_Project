import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
// import "../global.css"

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: 'red',
  }
});