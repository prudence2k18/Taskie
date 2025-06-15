import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';

export function SettingsScreen({ navigation, isDarkTheme, setIsDarkTheme }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
