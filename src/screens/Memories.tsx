import { Center, ScrollView, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import AppBar from '../components/app-bar';
import Calendar from '../components/Calendar';

export default function Memories() {
	const boxSize = (Dimensions.get('window').width - 120)/7;	  

  	return (
		<Center
			flex={1}
			bg={{
				linearGradient: {
				colors: ['muted.800', 'orange.500', 'teal.500'],
				start: [0, 1],
				end: [0.7, 0]
				}
			}}
			>
			<AppBar title="Memories" />
			<ScrollView flex={1} w={'100%'}>
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
