import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImportContactsScreen from '../screens/ImportContacts/ImportContactsScreen';
import ConfigContactsScreen from '../screens/ConfigContactsScreen/ConfigContactsScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hides the navigation header
      }
      }>
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

export default AuthStack;