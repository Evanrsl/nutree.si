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

		console.log(x)
	}

  	return (
	<VStack p={5}>
		{calculateNutrition()}
		<HStack justifyContent={'space-between'}>
			<Heading color="white" size="lg" m={1}>
				Nutrition
			</Heading>
		</HStack>

		<Center
			w={'100%'}
			alignSelf="center"
			bgColor="white"
			rounded="2xl"
			p={5}
			shadow={3}
		>
			<VStack>
				<Box w={'100%'}>
					<PieChart
						data={[
						{
							name: 'Carbs',
							value: 100,
							color: '#ef4444',
							legendFontColor: '#ef4444',
							legendFontSize: 20
						},
						{
							name: 'Fat',
							value: 30,
							color: '#fde047',
							legendFontColor: '#fde047',
							legendFontSize: 20
						},
						{
							name: 'Protein',
							value: 60,
							color: '#38bdf8',
							legendFontColor: '#38bdf8',
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
						center={[-6, 5]}
						absolute
					/>
				</Box>
			</VStack>
		</Center>
	</VStack>
	)
}