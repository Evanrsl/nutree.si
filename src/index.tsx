import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Pressable, Text } from 'native-base'

import Profile from './screens/Profile'
import Memories from './screens/Memories'
import Add from './screens/Add'
import List from './screens/List'
import Setting from './screens/Setting'

const Tab = createBottomTabNavigator()

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D9488',
          height: '8%'
        }
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, color: color }}>Home</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Memories"
        component={Memories}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, color: color }}>Memories</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={30} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, color: color }}>List</Text>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontSize: 12, color: color }}>Setting</Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={26} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default MyTabs
