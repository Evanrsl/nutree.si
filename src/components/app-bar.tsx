import React from 'react';
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, StatusBar } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

export default function AppBar({title}) {
    return <>
        <Box safeAreaTop bg="muted.800" />
        <HStack bg="muted.800" px="5" py="3" justifyContent="space-between" alignItems="center" w="100%">
          <HStack alignItems="center">
            <Text color="white" fontSize="30" fontWeight="bold">
              {title}
            </Text>
          </HStack>
        </HStack>
      </>;
  }