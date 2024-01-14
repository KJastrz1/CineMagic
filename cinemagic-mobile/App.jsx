import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import LoginScreen from './src/screens/LoginScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import { SessionProvider, SessionContext } from './src/Providers/SessionProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from 'screens/ProfileScreen';
import MySpinner from 'components/UI/MySpinner';
import MovieAddScreen from './src/screens/MovieAddScreen';

const MoviesStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

function MoviesStackNavigator() {
  return (
    <MoviesStack.Navigator>
      <MoviesStack.Screen name="MoviesScreen" component={MoviesScreen} options={{ headerShown: false }} />
      <MoviesStack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{ headerShown: true, title: '' }} />
    </MoviesStack.Navigator>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      {/* You can add more screens here that should be available before login */}
    </AuthStack.Navigator>
  );
}

function LoggedInTabNavigator() {
  const { role } = useContext(SessionContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e91e63',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Movies" component={MoviesStackNavigator} />
      {role === 'Admin' && <Tab.Screen name="MovieAdd" component={MovieAddScreen} />}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


function AppNavigator() {
  const { isAuth, isLoading } = useContext(SessionContext);

  if (isLoading) {
    return <MySpinner />
  }

  return (
    <NavigationContainer>
      {isAuth ? <LoggedInTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {

  return (
    <SessionProvider>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
 
});
