import { Center, ScrollView, VStack } from 'native-base';
import React, { useRef } from 'react';
import { Dimensions } from 'react-native';
import AppBar from '../components/app-bar';
import Calendar from '../components/Calendar';

export default function Memories() {
	const boxSize = (Dimensions.get('window').width - 70)/7;	  
	const scrollViewRef = useRef();
  	return (
		<Center
			flex={1}
			bg={{
				linearGradient: {
				colors: ['muted.900', 'orange.600', 'teal.500'],
				start: [0.4, 0.4],
				end: [1, 0]
				}
			}}
			>
			<AppBar title="Memories" />
			<ScrollView flex={1} w={'100%'}
			ref={ref => {this.scrollView = ref}}
			onContentSizeChange={() => this.scrollView.scrollToEnd({animated: false})}>
				<VStack p={2}>
					<Calendar boxSize={boxSize} year="2022" month="3" />
					<Calendar boxSize={boxSize} year="2022" month="4" />
					<Calendar boxSize={boxSize} year="2022" month="5" />
					<Calendar boxSize={boxSize} year="2022" month="6" />
					<Calendar boxSize={boxSize} year="2022" month="7" />

				</VStack>
			</ScrollView>
		</Center>
  )
}
