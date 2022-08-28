import { Box, Heading, HStack, Image, Pressable, Text, VStack } from "native-base";

/**
 * 
 * @param id code 
 * @param name 
 * @param type food type 
 * @param calories in Kal
 * @returns 
 */
const FoodItem = ({ food, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {
        ({ isPressed }) => {
          return (
            <Box 
              rounded='2xl' 
              bgColor={isPressed ? 'muted.600' : 'muted.700'}
              style={{
								transform: [{ scale: isPressed ? 0.96 : 1 }]
							}}
              mt='3' p='3'
            >
                <HStack p={1}>
                  <Image source={{ uri: food.url }} alt={food.Name} size='md' rounded='md' w='75' h='75' />
                    <VStack pl='3'>
                      <Heading w='200' size='md'>{food.Name}</Heading>
                      <Text italic>{food.Type}</Text>
                      <Text bold color='muted.300'>{food["Energi"]}</Text>
                  </VStack>
                </HStack>
            </Box>
          )
        }
      }
    </Pressable>
  )
}

export default FoodItem