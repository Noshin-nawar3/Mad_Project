import { Tabs } from 'expo-router'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../home';
import School from '../school';
import NoticeScreen from '../NoticeScreen';
import Event from '../event';
import Chat from '../chat';

export default function TabLayout() {
  return (
    <Tabs.Navigator>
        <Tabs.Screen name="home" component={Home}/>
        <Tabs.Screen name="chat" component={Chat}/>
        <Tabs.Screen name="event" component={Event}/>
        <Tabs.Screen name="school" component={School}/>
        <Tabs.Screen name="notice" component={NoticeScreen}/>
        {/* <Tabs.Screen name="TestHistory"/>
        <Tabs.Screen name="RAADSRTest"/> */}
    </Tabs.Navigator>
  )
}



