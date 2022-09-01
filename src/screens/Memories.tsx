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
				colors: [ 'tertiary.500','tertiary.400','tertiary.300', 'muted.50'],
				start: [0, 0],
				end: [0, 0.8]
				}
			}}
			>
			<AppBar title="Memories" />
			<ScrollView flex={1} w={'96%'}
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
