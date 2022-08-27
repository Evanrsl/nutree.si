import React, { useState } from 'react'
import {
  Text,
  HStack,
  Heading,
  Center,
  VStack,
  Box,
  ScrollView,
  Modal,
  Button,
  Flex,
  FlatList,
  Select,
  IconButton,
  Icon,
  Radio,
  Stack,
  Image
} from 'native-base'
import AppBar from '../components/app-bar'
import SearchBar from 'react-native-dynamic-search-bar'
import FoodItem from '../components/FoodItem'
import foods from '../data/foods.json'
import foodItems from '../data/nutree.json'
import { FontAwesome } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

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
      _dark={{ bg: 'black' }}
     
    >
      <AppBar title="Add" />
      <ScrollView flex={1} w={'100%'} bg={'muted.900'} p={5}>
        <Center>
          {data.map(({ Name, Energi, Karbohidrat, Qty, Size, Protein}, index) => {
            return (
              <Center m={3} key={Name}>
                <HStack>
                  <Box p={50} bg={'cyan.100'} rounded={'xl'}></Box>
                  <VStack p={3}>
                    <Heading w="200" size="md">
                      {Name} {Size}
                    </Heading>
                    <Text>{Energi}</Text>
                    <Text>Carbs : {Karbohidrat}, Protein : {Protein}</Text>
                    <HStack alignItems="center">
                      <Text>Quantity : {Qty} </Text>
                      <Text></Text>
                    </HStack>
                  </VStack>

                  <IconButton
                    variant="solid"
                    icon={
                      <Icon
                        size="md"
                        as={<FontAwesome name="trash" />}
                        color="white"
                      />
                    }
                    onPress={() => handleDelete(index)}
                  />
                </HStack>
              </Center>
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
            <Modal.Content w={'100%'}>
              <Modal.CloseButton />
              <Modal.Header>Add New Dish</Modal.Header>
              <Modal.Body>
                <SearchBar
                  placeholder="Search for food..."
                  onChangeText={text => handleOnChangeText(text)}
                  onClearPress={() => setFilteredData([])}
                  style={{}}
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
                    {foods['Favorite'].map(food => (
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
            <Modal.Content w={'100%'}>
              <Modal.CloseButton />
              <Modal.Header>Select Size and Quantity</Modal.Header>
              <Modal.Body>
                <Center m={3}>
                  <HStack>
                    <Box p={50} bg={'cyan.100'} rounded={'xl'}></Box>
                    <VStack p={3}>
                      <Heading w="200" size="md">
                        {selected.Name}
                      </Heading>
                      <Text>{selected.Energi}</Text>
                      <Text>Carbs : {selected.Karbohidrat}</Text>

                      <Radio.Group name="Size" defaultValue="S"
                      onChange={nextValue => setSize(nextValue)}>
                        <Stack
                          direction={{
                            base: 'row'
                          }}
                          alignItems={{
                            base: 'flex-start',
                            md: 'center'
                          }}
                          space={4}
                          w="75%"
                          my={3}
                        >
                          <Radio value="S" size="sm" mx={1}>
                            Small
                          </Radio>
                          <Radio value="M" size="sm" mx={1}>
                            Medium
                          </Radio>
                          <Radio value="L" size="sm" mx={1}>
                            Large
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
                  </HStack>
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
        </Center>
      </ScrollView>
      <Box h={10} bg={'primary.700'} w={'100%'} justifyContent={'flex-end'}>
        <HStack alignSelf="flex-end">
          <Text pt={3} fontSize={'md'}> Total Calorie </Text>
          {/* {data && data.map(({ Energi, Qty, Size}, index) => {
            setTotalCal(totalCal + parseInt(Energi.slice(0,-4)) * parseInt(Qty))
          })} */}
          <Text fontSize={'3xl'}>{totalCal}</Text>
        </HStack>
      </Box>
    </Center>
  )
}
