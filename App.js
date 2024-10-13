import React, { useReducer, useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { todos: state.todos.filter((_, index) => index !== action.payload) };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todo, setTodo] = useState('');

  const addTodo = () => {
    if (todo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todo });
      setTodo('');
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add new..."
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />
        <TouchableOpacity onPress={addTodo} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.todos}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => removeTodo(index)}>
            <Text style={styles.todoItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginRight: 10,
    fontSize: 20,
    padding: 8,
  },
  saveButton: {
    padding: 12,
  },
  saveButtonText: {
    color: '#007BFF',
    fontSize: 24,
  },
  todoItem: {
    padding: 8,
    margin: 4,
    fontSize: 16,
  },
});
