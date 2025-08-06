import { View, Text } from 'react-native'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="Home"/>
        <Tabs.Screen name="Chat"/>
        <Tabs.Screen name="Event"/>
        <Tabs.Screen name="School"/>
        <Tabs.Screen name="Notice"/>
    </Tabs>
  )
}