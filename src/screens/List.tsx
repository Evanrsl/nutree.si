import { Box, Center, Flex, Heading, HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import AppBar from '../components/app-bar'
import FoodGroup from '../components/FoodGroup'
import FoodItem from '../components/FoodItem'
import foods from '../data/data.json'

export default function List() {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <AppBar title="Food Library" />
      <ScrollView flex={1} w={'100%'} bg={'muted.900'} pt={6}>
        { 
          foods.map((food)=>{
            return(
              <FoodItem key={food.Code} name={food.Name} type={food.Type} calories={food["Energi (Energy)"]} />
            )
          })
        }
      </ScrollView>
    </Center>
  )
}
