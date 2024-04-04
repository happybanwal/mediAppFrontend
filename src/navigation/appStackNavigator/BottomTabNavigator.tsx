import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './stackNavigator/HomeStackNavigator';
import ProfileStackNavigator from './stackNavigator/ProfileStackNavigator';
import WalletStackNavigator from './stackNavigator/WalletStackNavigator';
import HistoryStackNavigator from './stackNavigator/HistoryStackNavigator';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { selectRole } from 'src/store/slices/AuthSlice';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const role = useSelector(selectRole);

  if (!role) {
    // Handle loading state if role is not available yet
    return <ActivityIndicator/>;
  }

  return (
    <Tab.Navigator>
      {role === 'patient' ? (
        <>
          <Tab.Screen
            name={'HomeStackNavigator'}
            component={HomeStackNavigator}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconButton icon="home" />,
            }}
          />
          <Tab.Screen
            name={'ProfileStackNavigator'}
            component={ProfileStackNavigator}
            options={{
              tabBarLabel: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconButton icon="account" />,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name={'WalletStackNavigator'}
            component={WalletStackNavigator}
            options={{
              tabBarLabel: 'Wallet',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconButton icon="wallet" />,
            }}
          />
          <Tab.Screen
            name={'HistoryStackNavigator'}
            component={HistoryStackNavigator}
            options={{
              tabBarLabel: 'History',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconButton icon="history" />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
