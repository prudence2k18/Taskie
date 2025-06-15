import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { lightTheme, darkTheme } from './components/theme';
import {HomeScreen} from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { IntroScreen } from './screens/IntroScreen';

const Stack = createNativeStackNavigator();
const THEME_KEY = '@theme_mode';

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load theme preference on startup
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        }
      } catch (e) {
        console.error('Failed to load theme:', e);
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_KEY, isDarkTheme ? 'dark' : 'light');
      } catch (e) {
        console.error('Failed to save theme:', e);
      }
    };

    saveTheme();
  }, [isDarkTheme]);

  if (!isReady) return null; // Wait for theme to load

  const currentTheme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Intro" options={{ headerShown: false }}>
            {props => <IntroScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {props => <HomeScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={{ headerShown: false }}>
            {props => (
              <SettingsScreen
                {...props}
                isDarkTheme={isDarkTheme}
                setIsDarkTheme={setIsDarkTheme}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
