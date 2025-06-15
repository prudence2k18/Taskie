import { MD3LightTheme, MD3DarkTheme, List } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    surface: '#f6f6f6',
    text: '#000000',
    List: 'gray',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    List: 'gray',
  },
};
