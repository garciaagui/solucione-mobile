import { Tabs } from 'expo-router'
import React from 'react'

import TabBar from '@/components/tab-bar'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      backBehavior="history"
      initialRouteName="index"
      tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="complaints" />
    </Tabs>
  )
}
