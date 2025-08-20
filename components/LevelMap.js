import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function LevelMap({ currentLevel = 1, onSelectLevel }) {
  return (
    <View style={styles.mapContainer}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const lvl = idx + 1;
        const isCompleted = lvl < currentLevel;
        const isCurrent = lvl === currentLevel;

        return (
          <React.Fragment key={lvl}>
            {idx !== 0 && <View style={styles.connector} />}
            <TouchableOpacity
              style={[
                styles.levelIcon,
                isCompleted && styles.completed,
                isCurrent && styles.current,
              ]}
              onPress={() => onSelectLevel && onSelectLevel(lvl)}
              activeOpacity={0.8}
            >
              <Text style={[styles.levelText, (isCompleted || isCurrent) && styles.levelTextActive]}>
                {lvl}
              </Text>
              {isCompleted && (
                <FontAwesome name="star" size={16} color="#FFD700" style={styles.starIcon} />
              )}
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
}



const styles = StyleSheet.create({
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  levelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  completed: {
    backgroundColor: '#6c5ce7', // playful purple
  },
  current: {
    backgroundColor: '#ffeaa7', // cheerful yellow
    transform: [{ scale: 1.1 }],
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  levelTextActive: {
    color: '#fff',
  },
  connector: {
    flex: 1,
    height: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 4,
  },
  starIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
