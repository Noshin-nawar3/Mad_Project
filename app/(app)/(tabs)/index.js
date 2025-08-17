import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router'
import Home from '../home';
import School from '../school';
import NoticeScreen from '../NoticeScreen';
import Event from '../event';
import Chat from '../chat';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
    >
        <Tabs.Screen name="home" component={Home}/>
        <Tabs.Screen name="chat" component={Chat}/>
        <Tabs.Screen name="event" component={Event}/>
        <Tabs.Screen name="school" component={School}/>
        <Tabs.Screen name="notice" component={NoticeScreen}/>
    </Tab.Navigator>
  );
}
