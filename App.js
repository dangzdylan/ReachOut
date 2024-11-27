import { NavigationContainer } from '@react-navigation/native';
import { AppState } from 'react-native';
import { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

export default function App() {
  
  return (
    /*
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator/>
    </GestureHandlerRootView>
    */
    <ProfileScreen />
  );
}