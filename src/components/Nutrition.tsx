import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HStack, NativeBaseProvider, VStack, Heading, Center, Text, Divider, Box } from 'native-base'
import theme from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import foodItems from '../data/memories-mock.json'
import database from '../data/data.json'



export default function Nutrition(props: any) {

	function calculateNutrition(){
		const x = foodItems[0].foods.reduce(function ({carb, protein, fat}, {Code, Portion}) {
			const item = database.find(x => x.Code === Code)
			if (!item) return

			const newFat = fat + parseFloat(item.Fat.replace(/[^\d.-]/g, ''))
			const newProtein = protein + parseFloat(item.Protein.replace(/[^\d.-]/g, ''))
			const newKarbohidrat = carb + parseFloat(item.Karbohidrat.replace(/[^\d.-]/g, ''))

			return {carb: newKarbohidrat, protein: newProtein, fat: newFat};
		}, {carb:0, protein:0, fat:0});

	}

  	return (
	<VStack p={5}>
		{/* {calculateNutrition()} */}
		<HStack justifyContent={'space-between'}>
			<Heading color="white" size="lg" m={1}>
				Nutrition
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
			<VStack>
				<Box w={'100%'}>
					<PieChart
						data={[
						{
							name: 'Carbs',
							value: 100,
							color: '#0D9488',
							legendFontColor: '#0D9488',
							legendFontSize: 20
						},
						{
							name: 'Fat',
							value: 30,
							color: '#F97316',
							legendFontColor: '#F97316',
							legendFontSize: 20
						},
						{
							name: 'Protein',
							value: 60,
							color: '#005EB9',
							legendFontColor: '#005EB9',
							legendFontSize: 20
						}
						]}
						width={300}
						height={220}
						chartConfig={{
						color: () => '#F97316',
						labelColor: (opacity = 1) =>
							`rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						},
						barRadius: 5
						}}
						accessor={'value'}
						backgroundColor={'transparent'}
						paddingLeft={'20'}
						center={[1, 5]}
						absolute
					/>
				</Box>
			</VStack>
		</Center>
	</VStack>
	)
}