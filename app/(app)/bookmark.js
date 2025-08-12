// Example: screens/Bookmark.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bookmark = () => (
  <View style={styles.container}>
    <Text
    // onPress={()=>navigation.navigate('event')}
    >Bookmark Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

export default Bookmark;
