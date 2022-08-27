import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import {
  Box, Button, Center, FlatList, Flex, Heading, HStack, Icon, IconButton, Image, Modal, Radio, ScrollView, Select, Stack, Text, VStack
} from 'native-base'
import React, { useState } from 'react'
import SearchBar from 'react-native-dynamic-search-bar'
import AppBar from '../components/app-bar'
import FoodItem from '../components/FoodItem'
import foods from '../data/data.json'
import foodItems from '../data/nutree.json'

export default function Add() {
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [selected, setSelected] = useState('')
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [size, setSize] = useState([""])
  const [qty, setQty] = useState([""])
  const today = new Date().toLocaleString();
  const [image, setImage] = useState(null);

  const totalCal = data.reduce(function(sum, current) {
    return sum + (parseInt(current.Energi.slice(0,-4)) * parseInt(current.Qty));
  }, 0);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleOnChangeText = (text = '') => {
    if (!text) {
      setFilteredData([])
    } else {
      let filtered = foodItems.filter(food =>
        food.Name.toLowerCase().match(text.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }

  const handleAddDish = food => {
    
    food["Size"] = size;
    food["Qty"] = qty;
    setData(olddata => [...olddata, food])
  }

  const handleDelete = index => {
    setData([...data.slice(0, index), ...data.slice(index + 1)])
  };

  return (
    <Center
      flex={1}
      bg={{
        linearGradient: {
          colors: ['orange.100', 'orange.600', 'black'],
          start: [0, 0],
          end: [0.7,1]
        }
      }}
    >
      <AppBar title="Add" />
      <ScrollView flex={1} w={'100%'} p={5}>
        <Center>
          {data.map(({ Name, Energi, Karbohidrat, Qty, Size, Protein, url}, index) => {
            return (
              <Box w='100%' rounded='2xl' bgColor='muted.800' mt='3' p='3' alignItems='center' alignContent='center'>
                <HStack p={1}>
                  <Image source={{ uri: url }} alt={Name} size='md' rounded='md' w='75' h='75' />
                  <VStack pl='3'>
                    <Heading w='200' size='md'>{Name}</Heading>
                    <Text bold color='muted.300'>{Energi}</Text>
                    <Text italic>Carbs: {Karbohidrat},  Protein: {Protein}</Text>
                    <Text>Quantity: {Qty} </Text>
                  </VStack>
                  <IconButton
                    alignItems='center'
                    p='3' pr='2' mt='6'
                    h='10'
                    colorScheme="red"
                    variant="outline"
                    icon={
                      <Icon
                        size="sm"
                        as={<FontAwesome name="trash" />}
                      />
                    }
                    onPress={() => handleDelete(index)}
                  />
                </HStack>
              </Box>
            )
          })}
          <Button
            my={5}
            w={'100%'}
            h={'80px'}
            rounded="xl"
            bg="muted.800"
            justifyContent={'center'}
            onPress={() => setShowModal(true)}
          >
            <Center>
              <Text color="blue.400">Add New Dish</Text>
            </Center>
          </Button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            avoidKeyboard
          >
            <Modal.Content w={'93%'} rounded='2xl'>
              <Modal.CloseButton />
              <Modal.Header>Add New Dish</Modal.Header>
              <Modal.Body>
                <SearchBar
                  placeholder="Search for food..."
                  onChangeText={text => handleOnChangeText(text)}
                  onClearPress={() => setFilteredData([])}
                  style={{ width: '96%'}}
                />
                {filteredData.length !== 0 ? (
                  <Box
                    w="94%"
                    bgColor="muted.200"
                    flex={1}
                    p={5}
                    pt={2}
                    m={3}
                    mb={1}
                    rounded="2xl"
                  >
                    <Flex direction="row">
                      <Heading color="#F97316" size="lg" mt="0.5" m="1">
                        Search Results
                      </Heading>
                    </Flex>
                    <FlatList
                      data={filteredData}
                      keyExtractor={food => food.Code}
                      renderItem={food => <FoodItem food={food.item} />}
                      h="80%"
                    />
                  </Box>
                ) : (
                  <ScrollView flex={1} w={'100%'}>
                    {foods.map(food => (
                      <Button
					  	key={food}
                        onPress={() => {
                          setShowModal2(true)
                          setSelected(food)
                        }}
                        bg={'transparent'}
                      >
                        <FoodItem key={food.Code} food={food} />
                      </Button>
                    ))}
                  </ScrollView>
                )}
              </Modal.Body>
            </Modal.Content>
          </Modal>

          <Modal
            isOpen={showModal2}
            onClose={() => setShowModal2(false)}
            size="lg"
          >
            <Modal.Content w={'93%'} rounded='2xl'>
              <Modal.CloseButton />
              <Modal.Header>Select Size and Quantity</Modal.Header>
              <Modal.Body>
                <Center m={3}>
                  <VStack>
                    <Center  bgColor='cyan.100' />
                    <Image source={{ uri: selected.url }} alt={selected.Name} rounded='md' w='300' h='200'  />
                    <VStack p={1} pt={4}>
                      <Heading w="200" size="md">
                        {selected.Name}
                      </Heading>
                      <Text bold color='muted.400' my={1}>{selected.Energi}</Text>
                      <Text bold color='muted.400'my={1}>Carbs : {selected.Karbohidrat}</Text>

                      <Radio.Group name="Size" defaultValue="S" onChange={nextValue => setSize(nextValue)}>
                        <Stack
                          direction={{
                            base: 'row'
                          }}
                          alignItems={{
                            base: 'flex-start',
                            md: 'row'
                          }}
                          space={3}
                          my={3}
                        >
                          <Radio value="S" size="sm" mx={1}>
                            <Text fontSize='xs'>Small</Text>
                          </Radio>
                          <Radio value="M" size="sm" mx={1}>
                            <Text fontSize='xs'>Medium</Text>
                          </Radio>
                          <Radio value="L" size="sm" mx={1}>
                            <Text fontSize='xs'>Large</Text>
                          </Radio>
                        </Stack>
                      </Radio.Group>

                      <HStack alignItems="center">
                        <Text>Quantity : </Text>
                        <Select
                          selectedValue={qty}
                          minWidth={60}
                          onValueChange={itemValue => {setQty(itemValue)}}
                          _selectedItem={{
                            bg: 'cyan.600'
                            // endIcon: <CheckIcon size={4} />
                          }}
                        >
                          <Select.Item label="1" value={1} />
                          <Select.Item label="2" value={2} />
                          <Select.Item label="3" value={3} />
                          <Select.Item label="4" value={4} />
                          <Select.Item label="5" value={5} />
                        </Select>
                      </HStack>
                    </VStack>
                  </VStack>
                </Center>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  flex="1"
                  onPress={() => {
                    handleAddDish(selected)
                    setShowModal(false)
                    setShowModal2(false)
                  }}
                >
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>


          <Center w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            p={5}>
            <Box>
            <Button onPress={pickImage} >Pick an image from camera roll</Button>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </Box>
          </Center>


          <Center w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            p={5} mt={5}>
            <Box>
              <Text>{today}</Text>
            </Box>
          </Center>
          <Center w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            p={5} mt={5}>
            <HStack justifyContent="space-between" w='100%'>
              <Text bold color='amber.700' fontSize='lg'>Total Calories</Text>
              <Text bold fontSize='lg'>0</Text>
            </HStack>
          </Center>
        </Center>
      </ScrollView>
      {/* <Box h={10} bg={'primary.700'} w={'100%'} justifyContent={'flex-end'}>
        <HStack alignSelf="flex-end">
          <Text pt={3} fontSize={'md'}> Total Calorie </Text>
          {/* {data && data.map(({ Energi, Qty, Size}, index) => {
            setTotalCal(totalCal + parseInt(Energi.slice(0,-4)) * parseInt(Qty))
          })}
          <Text fontSize={'3xl'}>{totalCal}</Text>
        </HStack>
      </Box> */}
    </Center>
  )
}
