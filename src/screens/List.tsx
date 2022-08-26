import { Box, Center, Flex, Heading, HStack, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import AppBar from '../components/app-bar'
import FoodGroup from '../components/FoodGroup'
import FoodItem from '../components/FoodItem'
import foods from '../data/foods.json'


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
          Object.entries(foods).forEach(([group, foodItems]) => {
            console.log(foodItems.slice(0,1))
            return <FoodGroup name={group} foods={foodItems} />
          })
        }
        <FoodGroup
          name='Cereals'
          foods={[ {Code: '1', Name: "Satay Ayam", Type: "bumbu kacang", Calories: "1000"} ]}
        />
        <FoodGroup
          name='Cereals'
          foods={[ {Code: '1', Name: "Satay Ayam", Type: "bumbu kacang", Calories: "1000"} ]}
        />
        <FoodGroup
          name='Cereals'
          foods={[ {Code: '1', Name: "Satay Ayam", Type: "bumbu kacang", Calories: "1000"} ]}
        />
      </ScrollView>
    </Center>
  )
}
