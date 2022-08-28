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
import BarChartComponent from './BarChartComponent'



export default function Calories(props: any) {

	return (
		<BarChartComponent type="Energi" title="Calories" />
	)
}