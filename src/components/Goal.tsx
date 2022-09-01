import { Center, Divider, Heading, HStack, Pressable, Text, VStack } from 'native-base'
import * as React from 'react'
import GoalModal from './GoalModal';

const Goal = ({ modalOpen, handleModal, goal, handleGoal }) => {
  return (
	<>
		<Pressable onPress={() => handleModal(true)}>
			{
				({ isPressed }) => {
					return <VStack p={5}>
						<HStack justifyContent={'space-between'}>
							<Heading size="lg" m={2} mb={3}>
								Goal
							</Heading>
						</HStack>
						<Center
							w={'100%'}
							alignSelf="center"
							bg={isPressed ? 'muted.100' : 'white'}
							style={{
								transform: [{ scale: isPressed ? 0.96 : 1 }]
							}}
							shadow={3}
							rounded="2xl"
							p={5}
						>
							<HStack>
								<VStack>
									<Text fontSize="md" color="muted.600" bold>Today</Text>
									<HStack>
										<Text bold fontSize="5xl" color="muted.600">{goal.today}</Text>
										<Text bold fontSize="md" color="muted.400" pl={1} mt={9}>kal</Text>
									</HStack>
								</VStack>
								<Divider orientation="vertical" mx={10} thickness={3} />
								<VStack justifyContent="space-evenly">
									<HStack alignItems="center">
										<Text fontSize="xl" mr={1.5} color="muted.600">{goal.target}</Text>
										<Text fontSize="sm" color="tertiary.500">target</Text>
									</HStack>
									<HStack alignItems="center">
										<Text fontSize="xl" mr={1.5} color="muted.600">{goal.avg}</Text>
										<Text fontSize="sm" color="tertiary.500">avg</Text>
									</HStack>
								</VStack>
							</HStack>
						</Center>
					</VStack>
				}
			}
		</Pressable>
		<GoalModal isOpen={modalOpen} handleModal={handleModal} handleGoal={handleGoal} />
	</>
)
}

export default Goal;