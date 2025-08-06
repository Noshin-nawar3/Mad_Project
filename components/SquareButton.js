// components/SquareButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can switch to Ionicons, Feather, etc.

const screenWidth = Dimensions.get('window').width;
const buttonSize = screenWidth / 3;

const SquareButton = ({ title, iconName, navigateTo, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Icon style={styles.iconn}name={iconName} size={buttonSize * 0.4} color="#333" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: buttonSize,
    height: buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  iconn:{
    color: '#6366F1',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default SquareButton;
