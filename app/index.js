import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import "../global.css"

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center" >  
      <ActivityIndicator size="large" color="gray"/>
      <Text>Loading...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: 'red',
  }
});