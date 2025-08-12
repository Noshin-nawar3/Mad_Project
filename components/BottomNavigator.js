// screens/BottomNavigator.js
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../app/(app)/home"; // Your current screen
import ChatScreen from "../app/(app)/chat";
import SchoolScreen from "../app/(app)/screens/SchoolScreen";
import EventScreen from "../app/(app)/screens/EventScreen";
import NoticeScreen from "../app/(app)/screens/NoticeScreen";

const homeName = "home";
const chatName = "chat";
const schoolName = "school";
const eventName = "event";
const noticeName = "notice";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
      <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route})=>({
        tabBarIcon:({focused, color,size})=>{
          let iconName;
          let rn=route.name;

          if(rn===homeName){
            iconName=focused?'home':'home-outline'
          }else if(rn===chatName){
            iconName=focused?'chat':'message-text-outline'
          }else if(rn===schoolName){
            iconName=focused?'school':'book'
          }else if(rn===eventName){
            iconName=focused?'event':'calender'
          }else if(rn===noticeName){
            iconName=focused?'notice':'bell-outline'
          }

          return <Ionicons name={iconName} size={size} collor={color}/>
        },
      })}

      tabBarOptions={{
        activeTintColor:'#6366F1',
        inactiveTintColor:'grey',
        labelStyle:{paddingBottom:10, fontSize:10},
        style: {padding:10, height: 70}
      }}
      >
        <Tab.Screen name={homeName} component={Home}/>
        <Tab.Screen name={chatName} component={ChatScreen}/>
        <Tab.Screen name={schoolName} component={SchoolScreen}/>
        <Tab.Screen name={eventName} component={EventScreen}/>
        <Tab.Screen name={noticeName} component={NoticeScreen}/>
        
      </Tab.Navigator>
  );
}
