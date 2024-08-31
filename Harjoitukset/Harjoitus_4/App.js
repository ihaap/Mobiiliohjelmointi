import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [tuote, setTuote] = useState("");
  const [lista, setLista] = useState([]);

  const addItem = () => {
    setLista([...lista, { key: tuote }]);
    setTuote("");
  };

  const clearList = () => {
    setLista([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add item"
        value={tuote}
        onChangeText={setTuote}
      />
      <View style={styles.buttons}>
        <Button title="Add" onPress={addItem} />
        <Button title="Clear" onPress={clearList} />
      </View>
      <Text style={styles.header}>Shopping List</Text>
      <FlatList
        data={lista}
        renderItem={({ item }) => <Text style={styles.listItem}>- {item.key}</Text>}
        style={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 200,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginBottom: 20,
  },
  list: {
    width: '80%',
  },
  listItem: {
    padding: 2,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});