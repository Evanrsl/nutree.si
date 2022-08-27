import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HStack, NativeBaseProvider, VStack, Heading, Center, Text, Divider } from 'native-base'
import theme from '../theme'
import { LinearGradient } from 'expo-linear-gradient'

export default function Goal(props: any) {
  return (
	<VStack p={5}>
		<HStack justifyContent={'space-between'}>
			<Heading color="white" size="lg" m={1}>
				Goal
			</Heading>
			<Text color="blue.400" mt={3} mr={5}>
				{' '}
				See All
			</Text>
		</HStack>
		<Center
		w={'100%'}
		alignSelf="center"
		bg={'muted.800'}
		rounded="2xl"
		p={5}
		>
			<HStack>
				<VStack>
					<Text fontSize="xl">Today</Text>
					<Text fontSize="5xl">1450</Text>
				</VStack>
				<Divider orientation="vertical" mx={10} thickness={3} />
				<VStack>
					<HStack>
						<Text fontSize="xl">1500</Text>
						<Text fontSize="xl">target</Text>
					</HStack>
					<HStack>
						<Text fontSize="xl">1675</Text>
						<Text fontSize="xl">avg</Text>
					</HStack>
				</VStack>
			</HStack>
		</Center>
	</VStack>
)
}