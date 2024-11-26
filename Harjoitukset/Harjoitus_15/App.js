import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button, IconButton, Appbar } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [purchases, setPurchases] = useState([]);

    const db = SQLite.openDatabaseSync('shopdb');
    const initialize = async () => {
      try {
          await db.execAsync(`
          CREATE TABLE IF NOT EXISTS purchase (id INTEGER PRIMARY KEY NOT NULL UNIQUE, product TEXT, amount TEXT);
        `);
          updateList();
      } catch (error) {
          console.error('Error:', error);
      }
  }
  useEffect(() => { initialize() }, []);

  const saveItem = async () => {
      if (product.trim() === '' || amount.trim() === '') {
          Alert.alert('Error', 'Product and amount cannot be empty.');
          return;
      }
      try {
          await db.runAsync('INSERT INTO purchase VALUES (?, ?, ?)', null, product, amount);
          updateList();
          setProduct('');
          setAmount('');
      } catch (error) {
        console.error('Error:', error);
      }
  };

  const updateList = async () => {
      try {
          const list = await db.getAllAsync('SELECT * from purchase');
          setPurchases(list);
      } catch (error) {
        console.error('Error:', error);
      }
  }

  const deleteItem = async (id) => {
      console.log('deleteItem id:', id);
      try {
          await db.runAsync('DELETE FROM purchase WHERE id=?', id);
          await updateList();
      } catch (error) {
        console.error('Error:', error);
      }
  }

    return (
        <PaperProvider>
            <View style={styles.safeArea}>
                <Appbar.Header>
                    <Appbar.Content title="Shopping List" />
                </Appbar.Header>
                <View style={styles.containerBasic}>
                    <TextInput
                        label='Product'
                        onChangeText={product => setProduct(product)}
                        value={product}
                        style={styles.input} />
                    <TextInput
                        label='Amount'
                        onChangeText={amount => setAmount(amount)}
                        value={amount}
                        style={styles.input} />
                    <Button mode="contained" onPress={saveItem} icon="content-save" buttonColor="green">
                        Save
                    </Button>
                </View>
                <View style={styles.containerResult}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) =>
                          <View style={styles.containerShoppingList}>
                              <View>
                                  <Text style={styles.productText}>
                                      {item.product}
                                  </Text>
                                  <Text>
                                      {item.amount}
                                  </Text>
                              </View>
                              <IconButton
                                  icon="delete"
                                  color="red"
                                  size={20}
                                  onPress={() => deleteItem(item.id)}
                              />
                          </View>}
                        data={purchases}
                    />
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    containerBasic: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20
    },
    containerResult: {
        paddingTop: 8,
        alignItems: "center",
    },
    containerShoppingList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    productText: {
      fontWeight: 'bold',
  },
    input: {
        width: '90%',
        margin: 10,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});