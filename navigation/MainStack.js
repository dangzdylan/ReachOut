import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ImportContactsScreen from '../screens/ImportContacts/ImportContactsScreen';
import ConfigContactsScreen from '../screens/ConfigContactsScreen/ConfigContactsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
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
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      <Stack.Screen 
        name="ImportContacts" 
        component={ImportContactsScreen} 
      />
      <Stack.Screen 
        name="ConfigContacts" 
        component={ConfigContactsScreen} 
      />
      
  </Stack.Navigator>
  );
};

export default MainStack;