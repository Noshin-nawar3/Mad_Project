// // components/SquareButton.js
// import React from 'react';
// import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can switch to Ionicons, Feather, etc.

// const screenWidth = Dimensions.get('window').width;
// const buttonSize = screenWidth / 3;

// const SquareButton = ({ title, iconName, navigateTo, navigation }) => {
//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => navigation.navigate(navigateTo)}
//     >
//       <Icon style={styles.iconn}name={iconName} size={buttonSize * 0.4} color="#333" />
//       <Text style={styles.text}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: buttonSize,
//     height: buttonSize,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 8,
//   },
//   iconn:{
//     color: '#6366F1',
//   },
//   text: {
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#333',
//   },
// });

// export default SquareButton;
import React from 'react';
import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
const buttonSize = screenWidth / 3;

export default function SquareButton({ title, iconName, onPress }) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.content}>
        <Icon name={iconName} size={buttonSize * 0.4} color="#6366F1" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});