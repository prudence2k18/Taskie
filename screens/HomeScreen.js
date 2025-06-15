import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Keyboard } from "react-native";
import { TextInput, Button, Appbar, List, useTheme } from "react-native-paper";
import { TaskItem } from "../components/TaskItem";
import { saveTasks, loadTasks } from "../utils/storage";

export function HomeScreen({ navigation }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: task, done: false },
    ]);
    setTask("");
    Keyboard.dismiss(); // Dismiss keyboard after adding task
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header theme={theme}>
        <Appbar.Content 
          title="Taskie" 
          titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
        />
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate("Settings")}
        />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            label="What needs to be done?"
            value={task}
            onChangeText={setTask}
            style={styles.input}
            mode="outlined"
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            onSubmitEditing={addTask}
            returnKeyType="done"
            right={
              <TextInput.Icon 
                icon="send" 
                onPress={addTask} 
                disabled={!task.trim()}
              />
            }
          />
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggle={toggleDone}
              onDelete={deleteTask}
              theme={theme}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <List.Icon icon="check-all" color={theme.colors.text} size={40} />
              <List.Subheader style={{ color: theme.colors.text }}>
                No tasks yet! Add one above.
              </List.Subheader>
            </View>
          }
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginVertical: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});