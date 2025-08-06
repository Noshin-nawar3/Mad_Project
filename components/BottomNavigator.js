// screens/BottomNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../app/(app)/home'; // Your current screen
import ChatScreen from '../app/(app)/screens/ChatScreen';
import SchoolScreen from '../app/(app)/screens/SchoolScreen';
import EventsScreen from '../app/(app)/screens/EventScreen';
import NoticeScreen from '../app/(app)/screens/NoticeScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Chat':
              iconName = 'chat-outline';
              break;
            case 'School':
              iconName = 'school-outline';
              break;
            case 'Events':
              iconName = 'calendar-month-outline';
              break;
            case 'Notice':
              iconName = 'bell-outline';
              break;
            default:
              iconName = 'circle-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="School" component={SchoolScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Notice" component={NoticeScreen} />
    </Tab.Navigator>
  );
}
