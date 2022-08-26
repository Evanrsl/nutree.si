import React, { useState } from 'react'
import {
  Text,
  HStack,
  Heading,
  Switch,
  useColorMode,
  Center,
  VStack,
  Box,
  NativeBaseProvider,
  Container,
  ScrollView,
  Divider,
  Modal ,
  Button,
  FormControl
} from 'native-base'
import AppBar from '../components/app-bar'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import SearchBar from "react-native-dynamic-search-bar";
import nutree from '../data/nutree.json';


export default function Add() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  return (
    <Center
      flex={1}
      _dark={{ bg: 'black' }}
      bg={{
        linearGradient: {
          colors: ['lightBlue.300', 'violet.800'],
          start: [0, 0],
          end: [1, 0]
        }
      }}
    >
      <AppBar title="Add" />
      <ScrollView flex={1} w={'100%'} bg={'muted.900'}>
      <Center>
      {data.map(({name, calorie, size, quantity}, index)=>{
        return(
          <Center>
            <HStack>
              <Box p={50} bg={'cyan.100'}></Box>
              <VStack>
                <Text>{name}</Text>
                <Text>{calorie}</Text>
                <Text>{size}</Text>
                <Text>{quantity}</Text>
              </VStack>
            </HStack>
          </Center>
        )
      })}
      <Button my={5} w={'90%'} h={'100px'} rounded="xl"  bg="muted.800"  justifyContent={"center"}
        onPress={() => setShowModal(true)}>
        <Center >
          <Text color="blue.400">Add New Dish</Text>
        </Center>
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add New Dish</Modal.Header>
          <Modal.Body>
              <SearchBar
              placeholder="find a dish"
              onChangeText={(text) => console.log(text)}
              style={{width:"100%"}}
            />
          {nutree.map(({Name}) =>{
              <Text>{Object.values(Name)}</Text>
          }
          )}
          <Text>test</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
    {nutree.map(({Name}) =>{
              <Text>{Object.values(Name)}</Text>
          }
          )}

      </ScrollView>
    </Center>
  )
}
