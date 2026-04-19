import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/theme';
import { useAppState } from '../context/AppContext';
import { CharacterSelectionScreen } from '../screens/CharacterSelectionScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { DisclaimerScreen } from '../screens/DisclaimerScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { selectedCharacter } = useAppState();

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.card,
          text: colors.text,
          border: colors.border,
          primary: colors.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {!selectedCharacter ? (
          <Stack.Screen name="CharacterSelection" component={CharacterSelectionScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
