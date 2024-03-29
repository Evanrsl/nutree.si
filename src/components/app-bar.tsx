import { Box, HStack, Text } from 'native-base';
import React from 'react';

export default function AppBar({ title="" }) {
    return <>
        <Box safeAreaTop />
        <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%">
          <HStack alignItems="center">
            <Text color="white" fontSize="30" fontWeight="bold">
              {title}
            </Text>
          </HStack>
        </HStack>
      </>;
  }