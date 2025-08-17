// Example: screens/NoticeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function NoticeScreen  () {
  return (
    <View style={styles.container}>
      <Text>Notice Screen</Text>
      {/* <Button onPress={() => router.push('home')}>
        Go to Home
      </Button>
      <Button onPress={() => router.push('chat')}>
        Go to Chat
      </Button>
      <Button onPress={() => router.push('event')}>
        Go to Event
      </Button>
      <Button onPress={() => router.push('/school')}>
        Go to School
      </Button> */}
    </View>
  
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

