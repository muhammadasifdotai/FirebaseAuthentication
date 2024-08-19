import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '@react-native-firebase/auth';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MobileVerifyScreen from '../screens/MobileVerifyScreen';
import ImageUpload from '../screens/ImageUpload';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="mobileverification"
          component={MobileVerifyScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="ImageUpload"
          component={ImageUpload}
          options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(user => {
      setIsUserLogin(user !== null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
        {isUserLogin ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;
