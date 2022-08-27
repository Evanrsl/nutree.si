import React from 'react'
import { Text, HStack, Switch, useColorMode, Center, VStack, ScrollView, Heading, Divider, Box, Spacer, Stack, Button } from 'native-base'
import AppBar from '../components/app-bar'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native';
import Calendar from '../components/Calendar';

export default function Memories() {
	const boxSize = (Dimensions.get('window').width - 120)/7;	  

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
			<AppBar title="Memories" />
			<ScrollView flex={1} w={'100%'} bg={'muted.900'}>
				<VStack p={5}>
					<Calendar boxSize={boxSize} year="2022" month="7" />
					<Calendar boxSize={boxSize} year="2022" month="6" />
					<Calendar boxSize={boxSize} year="2022" month="5" />
					<Calendar boxSize={boxSize} year="2006" month="0" />
					<Calendar boxSize={boxSize} year="2022" month="3" />

				</VStack>
			</ScrollView>
		</Center>
  )
}
