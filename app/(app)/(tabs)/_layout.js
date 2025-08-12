import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="home"/>
        <Tabs.Screen name="chat"/>
        <Tabs.Screen name="event"/>
        <Tabs.Screen name="school"/>
        <Tabs.Screen name="notice"/>
        <Tabs.Screen name="TestHistory"/>
        <Tabs.Screen name="RAADSRTest"/>
    </Tabs>
  )
}