import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HStack, NativeBaseProvider, VStack, Heading, Center, Text, Divider, Box } from 'native-base'
import theme from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import foodItems from '../data/memories-mock.json'
import database from '../data/data.json'



export default function Calories(props: any) {
	function calculateNutrition(){
		const toBeCalculated = foodItems[0]
		
		const x = toBeCalculated.foods.reduce(function (acc, {Code, Portion}) {
			const item = database.find(x => x.Code === Code)
			if (!item) return

			return acc + parseFloat(item.Energi.replace(/[^\d.-]/g, ''));
		}, 0);

		console.log(x)
	}

  return (
	<VStack p={5}>
		{calculateNutrition()}
		<HStack justifyContent={'space-between'}>
			<Heading color="white" size="lg" m={1}>
				Calories
			</Heading>
			<Text color="blue.400" mt={3} mr={5}>
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
			<VStack>
				<Center w={'80%'} bg="muted.700" px={5} py={1} rounded="md">
					<HStack>
						<Box bg="muted.500" flex={1} rounded="sm">
							<Text alignSelf={'center'}>D</Text>
						</Box>
						<Divider orientation="vertical" mx={5} thickness={3} />
						<Box rounded="sm" bg="muted.500" flex={1}>
							<Text alignSelf={'center'}>W</Text>
						</Box>
						<Divider orientation="vertical" mx={5} thickness={3} />
						<Box rounded="sm" bg="muted.500" flex={1}>
							<Text alignSelf={'center'}>M</Text>
						</Box>
					</HStack>
				</Center>
				<Box w={'100%'}>
					<BarChart
						withHorizontalLabels={false}
						yAxisLabel=""
						yAxisSuffix=""
						showBarTops={false}
						fromZero={true}
						style={{
						marginVertical: 8,
						left: 0,
						borderRadius: 16,
						paddingRight: 0
						}}
						data={{
						labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
						datasets: [
							{
							data: [40, 45, 25, 80, 99, 43, 50]
							}
						]
						}}
						width={300}
						height={220}
						chartConfig={{
						fillShadowGradientFromOpacity: 1,
						fillShadowGradientToOpacity: 1,
						decimalPlaces: 0,
						backgroundGradientToOpacity: 0,
						backgroundGradientFromOpacity: 0,
						color: () => '#F97316',
						labelColor: (opacity = 1) =>
							`rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						},
						barRadius: 5
						}}
					/>
				</Box>
			</VStack>
		</Center>
  </VStack>
)
}