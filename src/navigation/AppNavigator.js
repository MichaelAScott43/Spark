import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/themes';

import PersonalScreen from '../screens/PersonalScreen';
import ProfessionalScreen from '../screens/ProfessionalScreen';
import FunnyScreen from '../screens/FunnyScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabIcon({ emoji, focused, color }) {
  return (
    <Text
      style={{
        fontSize: focused ? 26 : 22,
        opacity: focused ? 1 : 0.6,
      }}
    >
      {emoji}
    </Text>
  );
}

function PersonalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PersonalMain" component={PersonalScreen} />
    </Stack.Navigator>
  );
}

function ProfessionalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfessionalMain" component={ProfessionalScreen} />
    </Stack.Navigator>
  );
}

function FunnyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FunnyMain" component={FunnyScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: getTabColor(route.name),
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            borderTopWidth: 1,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            paddingTop: 8,
            height: Platform.OS === 'ios' ? 80 : 62,
          },
          tabBarLabelStyle: {
            fontSize: FONTS.sizes.xs,
            fontWeight: '600',
            marginTop: 2,
          },
        })}
      >
        <Tab.Screen
          name="Personal"
          component={PersonalStack}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="💙" focused={focused} color={color} />
            ),
            tabBarLabel: 'Personal',
          }}
        />
        <Tab.Screen
          name="Professional"
          component={ProfessionalStack}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="💼" focused={focused} color={color} />
            ),
            tabBarLabel: 'Professional',
          }}
        />
        <Tab.Screen
          name="Funny"
          component={FunnyStack}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="😂" focused={focused} color={color} />
            ),
            tabBarLabel: 'Funny',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon emoji="⚙️" focused={focused} color={color} />
            ),
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function getTabColor(routeName) {
  switch (routeName) {
    case 'Personal':
      return COLORS.primary;
    case 'Professional':
      return COLORS.professional;
    case 'Funny':
      return COLORS.funny;
    case 'Settings':
      return COLORS.textSecondary;
    default:
      return COLORS.primary;
  }
}
