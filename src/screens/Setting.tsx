import React from 'react'
import { Text, HStack, Switch, useColorMode, Center, VStack } from 'native-base'

export default function Setting() {
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <Text>Setting!!</Text>
    </Center>
  )
}
