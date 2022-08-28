import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HStack, NativeBaseProvider, VStack, Heading, Center, Text, Divider, Box, Button } from 'native-base'
import theme from '../theme'
import { LinearGradient } from 'expo-linear-gradient'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import foodItems from '../data/memories-mock.json'
import database from '../data/data.json'
import { Dimensions } from 'react-native'
import {useState} from 'react';

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

const today = new Date()
const currDays = [
	days[(today.getDay()+1)%7], 
	days[(today.getDay()+2)%7], 
	days[(today.getDay()+3)%7], 
	days[(today.getDay()+4)%7], 
	days[(today.getDay()+5)%7], 
	days[(today.getDay()+6)%7], 
	days[today.getDay()]
]

const currMonths = [
	months[((today.getMonth()+6)%12)],
	months[((today.getMonth()+7)%12)],
	months[((today.getMonth()+8)%12)],
	months[((today.getMonth()+9)%12)],
	months[((today.getMonth()+10)%12)],
	months[((today.getMonth()+11)%12)],
	months[((today.getMonth()))],
]

export default function BarChartComponent(props: any) {
	function getNutritionFromMeal(item, property:string): number{
		return item.foods.reduce(function (acc, {Code, Portion}) {
			const item = database.find(x => x.Code === Code)

			if (!item) return

			return acc + parseFloat(item[property].replace(/[^\d.-]/g, ''));
		}, 0);
	}

	function calculateNutrition(x: string){
		let temp
		let result: number[] = []

		if (x === "D") {
			let currDay = new Date()
			for (let index = 0; index < 7; index++) {
				temp = foodItems.filter(x => x.date.substring(0, 10) === currDay.toISOString().substring(0, 10))
				result.push(temp.reduce((acc, item) => acc + getNutritionFromMeal(item, props.type),0));
	
				currDay.setDate(currDay.getDate() -1);
			}	
		} else if (x === "W") {
			// week is not implemented yet
			let currMonth = new Date()
			for (let index = 0; index < 7; index++) {
				temp = foodItems.filter(x => x.date.substring(0, 7) === currMonth.toISOString().substring(0, 7))
				result.push(temp.reduce((acc, item) => acc + getNutritionFromMeal(item, props.type),0));
	
				currMonth.setMonth(currMonth.getMonth()-1);
			}	
		} else {
			// x === "M"
			let currMonth = new Date()
			for (let index = 0; index < 7; index++) {
				temp = foodItems.filter(x => x.date.substring(0, 7) === currMonth.toISOString().substring(0, 7))
				result.push(temp.reduce((acc, item) => acc + getNutritionFromMeal(item, props.type),0));
	
				currMonth.setMonth(currMonth.getMonth()-1);
			}
		}

		return result.reverse()
	}

	function handlePress(x: string){
		setCurrentView(x)
		setBarChartData(calculateNutrition(x))

		switch(x){
			case "D":
				setBarChartLabel(currDays)
				break;
			case "W":
				// currweeks not implemented
				setBarChartLabel(currDays)
				break;
			case "M":
				setBarChartLabel(currMonths)
				break;

		}

	}

	const [currentView, setCurrentView] = useState("D")
	const [barChartData, setBarChartData] = useState([40, 45, 25, 80, 99, 43, 50])
	const [barChartLabel, setBarChartLabel] = useState(currDays)

	return (
		<VStack p={5}>
			<HStack justifyContent={'space-between'}>
				<Heading color="white" size="lg" m={1}>
					{props.title}
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
				<VStack alignItems="center">
					<Center w={'80%'} bg="muted.700" py={1} px={1} rounded="md" h={'40px'}>
						<HStack h={'100%'}>
							<Button flex={1} p={0} variant={currentView === "D"?"subtle":"outline"} onPress={()=>handlePress("D")}>
								<Text fontSize="xs">D</Text>
							</Button>
							<Divider orientation="vertical" mx={2} thickness={3} />
							<Button flex={1} p={0} variant={currentView === "W"?"subtle":"outline"} onPress={()=>handlePress("W")}>
								<Text fontSize="xs">W</Text>
							</Button>
							<Divider orientation="vertical" mx={2} thickness={3} />
							<Button flex={1} p={0} variant={currentView === "M"?"subtle":"outline"} onPress={()=>handlePress("M")}>
								<Text fontSize="xs">M</Text>
							</Button>
						</HStack>
					</Center>
					<Box w={'100%'} alignItems="center">
						<BarChart
							withHorizontalLabels={false}
							yAxisLabel=""
							yAxisSuffix=""
							showBarTops={false}
							fromZero={true}
							style={{
								marginVertical: 8,
								paddingRight: 0,
							}}
							data={{	labels: barChartLabel,
								datasets: [{data: barChartData}]
							}}
							width={Dimensions.get("window").width*0.7}
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
									borderRadius: 16,
								},
								barPercentage: .8,
								barRadius: 5
							}}
						/>
					</Box>
				</VStack>
			</Center>
		</VStack>
	)
}