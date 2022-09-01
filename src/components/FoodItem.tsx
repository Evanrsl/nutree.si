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
              bgColor={isPressed ? 'tertiary.100' : 'white'}
              shadow={1}
              style={{
								transform: [{ scale: isPressed ? 0.96 : 1 }]
							}}
              mt='3' p='3'
            >
                <HStack p={1}>
                  <Image source={{ uri: food.url }} alt={food.Name} size='md' rounded='md' w='75' h='75' />
                    <VStack pl='3'>
                      <Heading w='200' size='md' color='muted.700'>{food.Name}</Heading>
                      <Text italic color='muted.600'>{food.Type}</Text>
                      <Text bold color='muted.400'>{food["Energi"]}</Text>
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