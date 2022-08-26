import { Box, HStack, Center, VStack, Heading, Text } from "native-base"

/**
 * 
 * @param id code 
 * @param name 
 * @param type food type 
 * @param calories in Kal
 * @returns 
 */
const FoodItem = ({ key, name, type, calories }) => {
  return (
    <Box rounded='2xl' bgColor='teal.700' mt='3' p='2'>
      <HStack>
        {/* Image */}
        <Center rounded='md' w='75' h='75' m='1' bgColor='amber.900'></Center>
        <VStack ml='2'>
          <Heading size='md'>{name}</Heading>
          <Text>{type}</Text>
          <Text>{calories}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default FoodItem