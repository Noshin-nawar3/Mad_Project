import React from 'react';
import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FullWidthButton({ title, description, onPress }) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: screenWidth * 0.9,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 10,
    height: 150,
    elevation: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '400',
  },
});
