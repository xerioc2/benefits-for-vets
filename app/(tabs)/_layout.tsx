import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="info" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="privacy"
        options={{
          title: 'Privacy',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="shield" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

// Simple icon component using text emojis
function TabBarIcon({ name, color, size }: { name: string; color: string; size: number }) {
  const icons: { [key: string]: string } = {
    home: '🏠',
    info: 'ℹ️',
    shield: '🔒',
  };

  return (
    <Text style={{ fontSize: size, color }}>
      {icons[name] || '•'}
    </Text>
  );
}

