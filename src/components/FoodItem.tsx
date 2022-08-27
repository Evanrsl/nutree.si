import { Box, HStack, Center, VStack, Heading, Text } from "native-base"
import SearchBar from "react-native-dynamic-search-bar";

/**
 * 
 * @param id code 
 * @param name 
 * @param type food type 
 * @param calories in Kal
 * @returns 
 */
const FoodItem = ({ food }) => {
  return (
    <Box rounded='2xl' bgColor='muted.200' mt='3' p='3'>
      <HStack p={1}>
        {/* Image */}
        <Center rounded='md' w='75' h='75'  bgColor='teal.400' />
        <VStack pl='3'>
          <Heading w='200' size='md'>{food.Name}</Heading>
          <Text italic>{food.Type}</Text>
          <Text bold color='muted.500'>{food["Energi"]}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default FoodItem