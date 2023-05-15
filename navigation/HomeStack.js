import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AttackScreen from '../screens/AttackScreen';
import LeaderScreen from '../screens/LeaderScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerShown='false'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Attack' component={AttackScreen} />
      <Stack.Screen name='Leaderboard' component={LeaderScreen} />
    </Stack.Navigator>
  );
}