import React from 'react'
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
  Divider
} from 'native-base'
import AppBar from '../components/app-bar'
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit'
import { background } from 'native-base/lib/typescript/theme/styled-system'

export default function Profile() {
  const LinearGradient = require('expo-linear-gradient').LinearGradient
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  }
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
      <AppBar title="Profile" />
      <ScrollView flex={1} w={'100%'} bg={'muted.900'}>
        <VStack p={5}>
          <HStack justifyContent={'space-between'}>
            <Heading color="white" size="lg" m={1}>
              Goal
            </Heading>
            <Text color="blue.400" mt={3} mr={5}>
              {' '}
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
            <HStack>
              <VStack>
                <Text fontSize="xl">Today</Text>
                <Text fontSize="5xl">1450</Text>
              </VStack>
              <Divider orientation="vertical" mx={10} thickness={3} />
              <VStack>
                <HStack>
                  <Text fontSize="xl">1500</Text>
                  <Text fontSize="xl">target</Text>
                </HStack>
                <HStack>
                  <Text fontSize="xl">1675</Text>
                  <Text fontSize="xl">avg</Text>
                </HStack>
              </VStack>
            </HStack>
          </Center>
        </VStack>

        <VStack p={5}>
          <HStack justifyContent={'space-between'}>
            <Heading color="white" size="lg" m={1}>
              Calorie
            </Heading>
            <Text color="blue.400" mt={3} mr={5}>
              {' '}
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
            <VStack>
              <Box w={'100%'}>
                <PieChart
                  data={[
                    {
                      name: 'Carbs',
                      value: 100,
                      color: '#0D9488',
                      legendFontColor: '#0D9488',
                      legendFontSize: 20
                    },
                    {
                      name: 'Fat',
                      value: 30,
                      color: '#F97316',
                      legendFontColor: '#F97316',
                      legendFontSize: 20
                    },
                    {
                      name: 'Protein',
                      value: 60,
                      color: '#005EB9',
                      legendFontColor: '#005EB9',
                      legendFontSize: 20
                    }
                  ]}
                  width={300}
                  height={220}
                  chartConfig={{
                    color: () => '#F97316',
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    barRadius: 5
                  }}
                  accessor={'value'}
                  backgroundColor={'transparent'}
                  paddingLeft={'20'}
                  center={[1, 5]}
                  absolute
                />
              </Box>
            </VStack>
          </Center>
        </VStack>

        <VStack p={5}>
          <HStack justifyContent={'space-between'}>
            <Heading color="white" size="lg" m={1}>
              Nutrition
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
            <VStack>
              <Center w={'80%'} bg="muted.700" px={5} py={1} rounded="md">
                <HStack>
                  <Box bg="muted.500" flex={1} rounded="sm">
                    <Text alignSelf={'center'}>D</Text>
                  </Box>
                  <Divider orientation="vertical" mx={5} thickness={3} />
                  <Box rounded="sm" bg="muted.500" flex={1}>
                    <Text alignSelf={'center'}>W</Text>
                  </Box>
                  <Divider orientation="vertical" mx={5} thickness={3} />
                  <Box rounded="sm" bg="muted.500" flex={1}>
                    <Text alignSelf={'center'}>M</Text>
                  </Box>
                </HStack>
              </Center>
              <Box w={'100%'}>
                <BarChart
                  withHorizontalLabels={false}
                  yAxisLabel=""
                  yAxisSuffix=""
                  showBarTops={false}
                  fromZero={true}
                  style={{
                    marginVertical: 8,
                    left: 0,
                    borderRadius: 16,
                    paddingRight: 0
                  }}
                  data={{
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                      {
                        data: [40, 45, 25, 80, 99, 43, 50]
                      }
                    ]
                  }}
                  width={300}
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
                      borderRadius: 16
                    },
                    barRadius: 5
                  }}
                />
              </Box>
            </VStack>
          </Center>
        </VStack>

        <VStack p={5}>
          <HStack justifyContent={'space-between'}>
            <Heading color="white" size="lg" m={1}>
              Favorite Food
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
            <VStack>
              <Heading>Nasi Goreng</Heading>
              <Box bg={'blue.200'} w={'300px'} h={'200px'} rounded="lg"></Box>
            </VStack>
          </Center>
        </VStack>
      </ScrollView>
    </Center>
  )
}
