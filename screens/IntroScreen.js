import { StyleSheet, Text, View, Image, ImageBackground, Animated, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'react-native';
import { useTheme } from 'react-native-paper';

export function IntroScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const theme = useTheme();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    //fd
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/image/backGround.png")}
      style={styles.background}
      blurRadius={2}
    >
        <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.overlay} />
      
      <View style={styles.container}>
        <Animatable.View 
          animation="fadeInDown" 
          duration={1000}
          style={styles.header}
        >
          <Image
            source={require("../assets/image/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to Taskie!</Text>
        </Animatable.View>

        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.subtitle}>Your personal task manager</Text>
          <Text style={styles.description}>
            Organize your tasks, set reminders, and boost your productivity.
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});