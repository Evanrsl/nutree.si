import React from 'react'
import {
  Text,
  HStack,
  Heading,
  Switch,
  useColorMode,
  Center,
  VStack,
  Box,
  NativeBaseProvider,
  Container,
  ScrollView,
  Divider
} from 'native-base'
import AppBar from '../components/app-bar'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import { background } from 'native-base/lib/typescript/theme/styled-system'
import Goal from '../components/Goal'
import Nutrition from '../components/Nutrition'
import Calories from '../components/Calories'

export default function Profile() {
  const LinearGradient = require('expo-linear-gradient').LinearGradient
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  }
  return (
    <Center
		flex={1}
		_dark={{ bg: 'black' }}
		bg={{
			linearGradient: {
			colors: ['lightBlue.300', 'violet.800'],
			start: [0, 0],
			end: [1, 0]
			}
		}}
    >
		{/* {console.log(new Date(JSON.parse("\"2014-01-01T23:28:56.782Z\"")).getDay())} */}
		<AppBar title="Profile" />
		<ScrollView flex={1} w={'100%'} bg={'muted.900'}>
			<Goal></Goal>
			<Nutrition></Nutrition>
			<Calories></Calories>
    	</ScrollView>
    </Center>
  )
}