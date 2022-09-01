import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import { Box, Button, Center, FlatList, Flex, Heading, HStack, Image, Modal, Radio, ScrollView, Select, Stack, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import SearchBar from 'react-native-dynamic-search-bar'
import AddedFoodItem from '../components/AddedFoodItem'
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
  const [size, setSize] = useState([''])
  const [qty, setQty] = useState([''])
  const today = new Date().toLocaleString()
  const [image, setImage] = useState(null)
  const [temp, setTemp] = useState([])

  const totalCal = data.reduce(function (sum, current) {
    return sum + parseInt(current.Energi.slice(0, -4)) * parseInt(current.Qty)
  }, 0)

  const handlePost = () => {
    const temp = data.map(item => {
      return {
        Code: item.Code,
        Portion: item.Portion
      }
    })
    const saveData = {
      date: today,
      foods: temp,
      picture: image
    }
    save(saveData)
  }

  const save = async data => {
    let jsonValue = await AsyncStorage.getItem('foods')

    if (jsonValue !== null) {
      setTemp([JSON.parse(jsonValue), data])
    }
    await AsyncStorage.setItem('foods', JSON.stringify(temp))
    setData([])
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

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
    food['Size'] = size
    food['Qty'] = qty
    setData(olddata => [...olddata, food])
  }

  const handleDelete = index => {
    setData([...data.slice(0, index), ...data.slice(index + 1)])
  }

  return (
    <Center
      flex={1}
      bg={{
        linearGradient: {
          colors: [ 'tertiary.500','tertiary.400','tertiary.300', 'muted.50'],
          start: [0, 0],
          end: [0, 0.7]
          }
      }}
    >
      <AppBar title="Add" />
      <ScrollView flex={1} w={'95%'} mt={5}>
          {
            data.map((props, index) => <AddedFoodItem {...props} index={index} handleDelete={handleDelete} />)
          }
          <Button
            mt={2} mb={2}
            w={'100%'} h={'80px'}
            rounded="xl"
            bg="white"
            shadow={4}
            justifyContent={'center'}
            onPress={() => setShowModal(true)}
          >
            <Center>
              <Text color="emerald.300" fontSize="lg" bold>Add New Dish</Text>
            </Center>
          </Button>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            avoidKeyboard
          >
            <Modal.Content w={'93%'} rounded="2xl">
              <Modal.CloseButton />
              <Modal.Header>Add New Dish</Modal.Header>
              <Modal.Body>
                <SearchBar
                  placeholder="Search for food..."
                  onChangeText={text => handleOnChangeText(text)}
                  onClearPress={() => setFilteredData([])}
                  style={{ width: '96%' }}
                />
                {filteredData.length !== 0 ? (
                  <Box
                    w="94%"
                    bgColor="white"
                    flex={1}
                    p={5}
                    pt={2}
                    m={3}
                    mb={1}
                    rounded="2xl"
                  >
                    <Flex direction="row">
                      <Heading color="emerald.500" size="lg" mt="0.5" m="1">
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
                      <FoodItem 
                        key={food.Code}
                        food={food}
                        onPress={() => {
                          setShowModal2(true)
                          setSelected(food)
                        }}
                      />
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
            <Modal.Content w={'93%'} rounded="2xl" bgColor="muted.800">
              <Modal.CloseButton />
              <Modal.Header>Select Size and Quantity</Modal.Header>
              <Modal.Body>
                <Center m={3}>
                  <VStack>
                    <Center bgColor="emerald.400" />
                    <Image
                      source={{ uri: selected.url }}
                      alt="Dish Image"
                      rounded="md"
                      w="300"
                      h="200"
                    />
                    <VStack p={1} pt={4}>
                      <Heading w="200" size="md" color="emerald.300">
                        {selected.Name}
                      </Heading>
                      <Text bold color="muted.400" my={1}>
                        {selected.Energi}
                      </Text>
                      <Text bold color="muted.400" my={1}>
                        Carbs : {selected.Karbohidrat}
                      </Text>

                      <Radio.Group
                        name="Size"
                        defaultValue="S"
                        onChange={nextValue => setSize(nextValue)}
                      >
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
                            <Text fontSize="xs">Small</Text>
                          </Radio>
                          <Radio value="M" size="sm" mx={1}>
                            <Text fontSize="xs">Medium</Text>
                          </Radio>
                          <Radio value="L" size="sm" mx={1}>
                            <Text fontSize="xs">Large</Text>
                          </Radio>
                        </Stack>
                      </Radio.Group>

                      <HStack alignItems="center">
                        <Text>Quantity : </Text>
                        <Select
                          selectedValue={qty}
                          minWidth={60}
                          onValueChange={itemValue => {
                            setQty(itemValue)
                          }}
                          _selectedItem={{
                            bg: 'emerald.600'
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

          <Center
            w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            p={5}
          >
            <Box>
              <Button
                onPress={pickImage}
                bg={'transparent'}
                borderWidth={1}
                rounded={'xl'}
              >
                Pick an image from camera roll
              </Button>
              {image && (
                <Image
                alt="Add Image"
                  rounded={'xl'}
                  source={{ uri: image }}
                  style={{ width: 300, height: 300 }}
                />
              )}
            </Box>
          </Center>

          <Center
            w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            p={5}
            mt={1}
          >
            <Box>
              <Text>{today}</Text>
            </Box>
          </Center>
          <Center
            w={'100%'}
            alignSelf="center"
            bg={'muted.800'}
            rounded="2xl"
            pl={5} pr={5} p={3}
            mt={5}
          >
            <HStack justifyContent="space-between" w="100%">
              <Text bold color="emerald.500" fontSize="lg">
                Total Calories
              </Text>
              <Text bold fontSize="lg">
                {totalCal}
              </Text>
            </HStack>
            <Button
                bottom={2}
                bg={'transparent'}
                onPress={() => handlePost()}
                mt={3} w="80"
              >
                <Text bold fontSize={'lg'} color={'blue.500'}>
                  Post
                </Text>
              </Button>
          </Center>
      </ScrollView>
    </Center>
  )
}
