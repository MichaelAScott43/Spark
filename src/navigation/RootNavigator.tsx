import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppState } from '../context/AppContext';
import { colors } from '../constants/theme';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { CheckInScreen } from '../screens/CheckInScreen';
import { JournalScreen } from '../screens/JournalScreen';
import { HelpNowScreen } from '../screens/HelpNowScreen';
import { SafetyPlanScreen } from '../screens/SafetyPlanScreen';
import { PatternsScreen } from '../screens/PatternsScreen';
import { VoiceSupportScreen } from '../screens/VoiceSupportScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
    >
      <Tab.Screen name="Check-In" component={CheckInScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Help Now" component={HelpNowScreen} />
      <Tab.Screen name="Safety Plan" component={SafetyPlanScreen} />
      <Tab.Screen name="Patterns" component={PatternsScreen} />
      <Tab.Screen name="Voice" component={VoiceSupportScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { onboardingDone } = useAppState();

  return (
    <NavigationContainer theme={{ ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.card, text: colors.text } }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboardingDone ? <Stack.Screen name="Onboarding" component={OnboardingScreen} /> : <Stack.Screen name="Home" component={MainTabs} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
