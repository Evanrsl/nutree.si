import { Center, ScrollView } from 'native-base'
import React, { useState } from 'react'
import AppBar from '../components/app-bar'
import Calories from '../components/Calories'
import Goal from '../components/Goal'
import Nutrition from '../components/Nutrition'
import BarChartComponent from '../components/BarChartComponent'

const Profile = () => {
  const [showGoal, setShowGoal] = useState(false)
  const [goal, setGoal] = useState({
    today: '1450',
    target: '1500',
    avg: '1675'
  })

  return (
    <Center
      flex={1}
      bg={{
        linearGradient: {
          colors: ['orange.700', 'orange.400', 'muted.900'],
          start: [-0.1, 0.1],
          end: [0.3, 0.5]
        }
      }}
    >
		<AppBar title="Profile" />
		<ScrollView flex={1} w={'100%'}>
		<Goal
			modalOpen={showGoal}
			handleModal={setShowGoal}
			goal={goal}
			handleGoal={setGoal}
		/>
		<Nutrition />
		{/* <Calories /> */}
		<BarChartComponent type="Energi" title="Calories" />
		<BarChartComponent type="Protein" title="Protein" />
		<BarChartComponent type="Karbohidrat" title="Carbohydrate" />
		<BarChartComponent type="Fat" title="Fat" />


    	</ScrollView>
    </Center>
  )
}

export default Profile
