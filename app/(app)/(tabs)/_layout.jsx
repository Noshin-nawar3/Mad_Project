import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="Home"/>
        <Tabs.Screen name="Chat"/>
        <Tabs.Screen name="Event"/>
        <Tabs.Screen name="School"/>
        <Tabs.Screen name="Notice"/>
        <Tabs.Screen name="TestHistory"/>
        <Tabs.Screen name="RAADSRTest"/>
    </Tabs>
  )
}