import { Box, Center, FlatList, Flex, Heading, ScrollView } from 'native-base'
import React, { useState } from 'react'
import SearchBar from "react-native-dynamic-search-bar";
import AppBar from '../components/app-bar'
import FoodGroup from '../components/FoodGroup'
import FoodItem from '../components/FoodItem'
import foods from '../data/data.json'
import foodItems from '../data/nutree.json'

export default function List() {
  const [filteredData, setFilteredData] = useState([])

  const handleOnChangeText = (text) => {
    if (!text) {
      setFilteredData([])
    } else {
      let filtered = foodItems.filter((food) => food.Name.toLowerCase().match(text.toLowerCase()))
      setFilteredData(filtered)
    }
  }

  return (
    <Center
      bg={{
        linearGradient: {
          colors: ['blue.600', 'amber.600', 'black'],
          start: [0, 0],
          end: [0.6,1]
        }
      }}
      flex={1}
    >
      <AppBar title="Food Library" />
      <Center
        rounded='2xl'
        bg='muted.100'
        w={'94%'}
        mt={5}
      >
        <SearchBar
          placeholder="Search for food..."
          onChangeText={(text) => handleOnChangeText(text)}
          onClearPress={() => setFilteredData([])}
          style={{ backgroundColor: 'muted.800' }}
        />
      </Center>
      {
        filteredData.length !== 0 ? 
        <Box
          w='94%'
          bgColor='muted.100'
          flex={1}
          p={5} pt={2}
          m={3} mb={1}
          rounded='2xl'
        >
          <Flex direction='row'>
            <Heading color='#F97316' size='lg' mt='0.5' m='1'>Search Results</Heading>
          </Flex>
          <FlatList
            data={filteredData}
            keyExtractor={food => food.Code}
            renderItem={(food) => <FoodItem food={food.item} />}
            h='80%'
          />
        </Box>
        :
        <Box
          w='94%'
          bgColor='muted.800'
          flex={1}
          p={5} pt={2}
          m={3} mb={1}
          rounded='2xl'
        >
          <Flex direction='row'>
            <Heading color='#F97316' size='lg' mt='0.5' m='1'>Foods</Heading>
          </Flex>
          <FlatList
            data={foods}
            keyExtractor={food => food.Code}
            renderItem={(food) => <FoodItem food={food.item} />}
            h='80%'
          />
        </Box>
        // <ScrollView flex={1} w={'100%'}>
        //   {
        //     Object.keys(foods).map((group, index) => {
        //       return <FoodGroup key={index} name={group} foods={foods[group].slice(0,3)} />
        //     })
        //   }
        // </ScrollView>
      }
    </Center>
  )
}
