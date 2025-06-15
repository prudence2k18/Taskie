import React from 'react';
import { List, IconButton, useTheme } from 'react-native-paper';
import { StyleSheet, Animated, View } from 'react-native';

export function TaskItem({ item, onToggle, onDelete, theme }) {
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  
  const handleDelete = () => {
    // Add a fade-out animation before deleting
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onDelete(item.id));
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <List.Item
        title={item.text}
        titleStyle={{
          textDecorationLine: item.done ? 'line-through' : 'none',
          color: item.done ? theme.colors.disabled : theme.colors.text,
        }}
        description={item.done ? 'Completed' : 'Pending'}
        descriptionStyle={{
          color: item.done ? theme.colors.primary : theme.colors.error,
          fontSize: 12,
        }}
        onPress={() => onToggle(item.id)}
        style={[
          styles.item,
          { 
            backgroundColor: theme.colors.surfaceVariant,
            borderLeftWidth: 4,
            borderLeftColor: item.done ? theme.colors.primary : 'transparent',
          }
        ]}
        left={() => (
          <View style={styles.leftIcon}>
            <List.Icon 
              icon={item.done ? 'check-circle' : 'circle-outline'} 
              color={item.done ? theme.colors.primary : theme.colors.outline}
            />
          </View>
        )}
        right={() => (
          <IconButton 
            icon="trash-can-outline" 
            onPress={handleDelete}
            iconColor={theme.colors.error}
            size={20}
            style={styles.deleteButton}
          />
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
    borderRadius: 8,
    paddingVertical: 8,
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    marginRight: 8,
    alignSelf: 'center',
  },
});