// Example: screens/NoticeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoticeScreen = () => (
  <View style={styles.container}>
    <Text
    // onPress={()=>navigation.navigate('notice')}
    >Notice Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

export default NoticeScreen;
