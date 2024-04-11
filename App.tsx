/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import DetailScreen
  from './src/screens/DetailScreen';
import PaymentScrren from './src/screens/PaymentScrren';
import TabNavigator from './src/navigators/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{ animation: 'slide_from_bottom' }}>

        </Stack.Screen>
        <Stack.Screen name="Details" component={DetailScreen} options={{ animation: 'slide_from_bottom' }}>

        </Stack.Screen>
        <Stack.Screen name="Payments" component={PaymentScrren} options={{ animation: 'slide_from_bottom' }}>

        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  )

}
export default App


