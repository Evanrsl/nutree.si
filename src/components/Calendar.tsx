import React from 'react'
import {
  Text,
  HStack,
  Switch,
  useColorMode,
  Center,
  VStack,
  Box,
  Button
} from 'native-base'

export default function Calendar(props: any) {
  function getAllDaysInMonth(year: number, month: number) {
    const date = new Date(year, month, 1)
    const res: JSX.Element[] = []
    let bin: JSX.Element[] = []

    let keyIndex = 0
    let index = 0
    // First row of the calendars, if sunday (0) then this doesn't get executed
    while (date.getDay() !== index) {
      bin.push(<Box w={boxSize} h={boxSize + 10} key={keyIndex} />)
      index++
      keyIndex++
    }

    while (date.getDay() !== 0) {
      bin.push(
        <Button
          bg="transparent"
          w={boxSize}
          h={boxSize * 1.3}
          key={keyIndex}
          rounded={'lg'}
        >
          {' '}
          {date.getDate()}{' '}
        </Button>
      )
      date.setDate(date.getDate() + 1)
      keyIndex++
    }

    res.push(
      <HStack justifyContent={'space-between'} pb="1" key={keyIndex}>
        {bin}
      </HStack>
    )
    bin = []
    index = 0
    keyIndex++

    while (date.getMonth() == month) {
      bin.push(
        <Button
          bg="transparent"
          w={boxSize}
          h={boxSize * 1.3}
          key={keyIndex}
          rounded={'lg'}
        >
          {' '}
          {date.getDate()}{' '}
        </Button>
      )
      date.setDate(date.getDate() + 1)

      index++
      keyIndex++
      if (index === 7) {
        res.push(
          <HStack justifyContent={'space-between'} pb="1" key={keyIndex}>
            {bin}
          </HStack>
        )
        bin = []
        index = 0
        keyIndex++
      }
    }

    for (let i = 0; i < 7 - index && index != 0; i++) {
      bin.push(<Box w={boxSize} h={boxSize * 1.3} key={keyIndex} />)
      keyIndex++
    }

    res.push(
      <HStack justifyContent={'space-between'} pb="1" key={keyIndex}>
        {bin}
      </HStack>
    )
    return res
  }

  const boxSize = props.boxSize

  return (
    <Center
      w={'100%'}
      alignSelf="center"
      bg={'muted.800'}
      rounded="2xl"
      p={3}
      mb={5}
    >
      <VStack w={'100%'}>
        <Text bold fontSize="xl" mb={2} alignItems="flex-start">
          {months[props.month] + ' ' + props.year}
        </Text>
        <VStack alignSelf="center" w={'100%'}>
          <HStack justifyContent={'space-between'}>
            <Box w={boxSize} h={boxSize * 1.3}>
              SUN
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              MON
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              TUE
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              WED
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              THU
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              FRI
            </Box>
            <Box w={boxSize} h={boxSize * 1.3}>
              SAT
            </Box>
          </HStack>
          {getAllDaysInMonth(props.year, props.month)}
        </VStack>
      </VStack>
    </Center>
  )
}

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
