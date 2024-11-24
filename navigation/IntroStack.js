import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';

const Stack = createStackNavigator();

const IntroStack = () => {

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // Hides the navigation header
      }
    }>
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
    </Stack.Navigator>
  );
};

export default IntroStack;