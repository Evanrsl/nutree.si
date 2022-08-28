import { Box, Heading, HStack, Icon, IconButton, Image, VStack, Text } from "native-base"
import { FontAwesome } from '@expo/vector-icons'
import React from "react"

const AddedFoodItem = ({ Name, Energi, Karbohidrat, Qty, Protein, url, index, handleDelete }) => {
  return (
    <Box
        key={index}
        w="100%"
        rounded="2xl"
        bgColor="muted.800"
        mt="3"
        p="3"
        alignItems="center"
        alignContent="center"
    >
        <HStack p={1}>
        <Image
            source={{ uri: url }}
            alt="Dish Image"
            size="md"
            rounded="md"
            w="75"
            h="75"
        />
            <VStack pl="3">
                <Heading w="200" size="md">
                {Name}
                </Heading>
                <Text bold color="muted.300">
                {Energi}
                </Text>
                <Text italic>
                Carbs: {Karbohidrat}, Protein: {Protein}
                </Text>
                <Text>Quantity: {Qty} </Text>
            </VStack>
            <IconButton
                alignItems="center"
                p="3"
                pr="2"
                mt="6"
                h="10"
                colorScheme="red"
                variant="outline"
                icon={
                <Icon size="sm" as={<FontAwesome name="trash" />} />
                }
                onPress={() => handleDelete(index)}
            />
        </HStack>
    </Box>
  )
}

export default AddedFoodItem