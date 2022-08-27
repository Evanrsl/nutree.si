import React from 'react'
import { Text, HStack, Switch, useColorMode, Center, VStack, Box, Button } from 'native-base'

export default function Calendar(props: any) {


	function getAllDaysInMonth(year: number, month: number) {
		const date = new Date(year, month, 1);
		const res: JSX.Element[] = [];
		let bin: JSX.Element[]=[]

		let keyIndex = 0
		let index = 0
		// First row of the calendars, if sunday (0) then this doesn't get executed
		while (date.getDay() !== index) {
			bin.push(<Box w={boxSize} h={boxSize} key={keyIndex} />)
			index++
			keyIndex++
		}

		while (date.getDay() !== 0) {
			bin.push(<Button bg="primary.500" w={boxSize} h={boxSize} key={keyIndex}> {date.getDate()} </Button>)
			date.setDate(date.getDate() + 1);
			keyIndex++
		}

		res.push(<HStack justifyContent={"space-between"} pb="1" key={keyIndex}>{bin}</HStack>)
		bin = []
		index = 0
		keyIndex++
		
		while (date.getMonth() == month) {
			bin.push(<Button bg="primary.500" w={boxSize} h={boxSize} key={keyIndex}> {date.getDate()} </Button>)
			date.setDate(date.getDate() + 1);

			index ++
			keyIndex ++
			if (index === 7) {
				res.push(<HStack justifyContent={"space-between"} pb="1" key={keyIndex}>{bin}</HStack>)
				bin = []
				index = 0
				keyIndex ++
			}
		}

		for (let i = 0; i < 7-index && index != 0; i++) {
			bin.push(<Box w={boxSize} h={boxSize} key={keyIndex} />)
			keyIndex++;
		}


		res.push(<HStack justifyContent={"space-between"} pb="1" key={keyIndex}>{bin}</HStack>)
		return res;
	  }


	const boxSize = props.boxSize
	  
  	return (
			<Center
			w={'100%'}
			alignSelf="center"
			bg={'muted.800'}
			rounded="2xl"
			p={5}
			mb={10}
		>
			<VStack w={'100%'}>
				<Text fontSize="2xl" mb={2} alignItems="flex-start">{months[props.month] + " " + props.year}</Text>
				<VStack alignSelf="center" w={'100%'}>
					<HStack justifyContent={"space-between"}>
						<Box w={boxSize} h={boxSize}>Sun</Box>
						<Box w={boxSize} h={boxSize}>Mon</Box>
						<Box w={boxSize} h={boxSize}>Tue</Box>
						<Box w={boxSize} h={boxSize}>Wed</Box>
						<Box w={boxSize} h={boxSize}>Thu</Box>
						<Box w={boxSize} h={boxSize}>Fri</Box>
						<Box w={boxSize} h={boxSize}>Sat</Box>
					</HStack>
					{getAllDaysInMonth(props.year, props.month)}
				</VStack>
			</VStack>
		</Center>
	)
}

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

