import { Box, Flex, Heading, VStack } from "native-base";
import FoodItem from "./FoodItem";

/**
 * 
 * @param name group name, e.g. 'Cereals'
 * @param foods array of food items inside the specified food group
 * @returns Foodgroup card displaying food items inside that group
 */
const FoodGroup = ({ name, foods }) => {
  return (
    <Box
        bg='muted.100'
        flex={1}
        p={5}
        pt={2}
        m={3}
        rounded='2xl'
    >
        <Flex direction='row'>
            <Heading color='#F97316' size='lg' mt='0.5' m='1'>{name}</Heading>
        </Flex>
        
        <VStack>
            
            {foods.map((food) => {
               console.log(food) 
               return( 
                
                <FoodItem key={food.Code} name={food.Name} type={food.Type} calories={food["Energi (Energy)"]} />
           )})
            }
        </VStack>
        
    </Box>
  )
}

export default FoodGroup