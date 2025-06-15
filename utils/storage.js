import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@taskie_tasks';

export const saveTasks = async (tasks) => {
  try {
    const json = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, json);
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
};

export const loadTasks = async () => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error loading tasks:', e);
    return [];
  }
};
export const clearTasks = async () => {
  try {
    await AsyncStorage.removeItem(TASKS_KEY);
  } catch (e) {
    console.error('Error clearing tasks:', e);
  }
};