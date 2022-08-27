import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  children: React.ReactNode
}

export default function AppContainer(props: Props) {
  const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };

  return (
    <NavigationContainer>
      <NativeBaseProvider config={config} theme={theme}>{props.children}</NativeBaseProvider>
    </NavigationContainer>
  )
}