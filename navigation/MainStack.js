import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import ImportContactsScreen from '../screens/ImportContacts/ImportContactsScreen';
import ConfigContactsScreen from '../screens/ConfigContactsScreen/ConfigContactsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ContactListScreen from '../screens/ContactListScreen/ContactListScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import ChangeContactNumberScreen from '../screens/SettingsScreen/ChangeContactNumberScreen';
import ChangePasswordScreen from '../screens/SettingsScreen/ChangePasswordScreen';


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

      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
      />
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="ChangeContactNumber"
        component={ChangeContactNumberScreen}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
  </Stack.Navigator>
  );
};

export default MainStack;