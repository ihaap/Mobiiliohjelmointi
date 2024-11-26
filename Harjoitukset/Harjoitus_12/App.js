import { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { db } from './firebaseConfig';
import { ref, push, onValue, remove, set } from 'firebase/database';

export default function App() {

    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [purchases, setPurchases] = useState([]);

    const initialize = async () => {
        try {
            await updateList();
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }
    useEffect(() => { initialize() }, []);

    const saveItem = async () => {
        if (product.trim() === '' || amount.trim() === '') {
            Alert.alert('Error', 'Product and amount cannot be empty.');
            return;
        }
        try {
            const newPurchaseRef = push(ref(db, 'purchases'));
            await set(newPurchaseRef, {
                product,
                amount
            });
            updateList();
            setProduct('');
            setAmount('');
        } catch (error) {
          console.error('Error saving item:', error);
        }
    };

    const updateList = async () => {
        try {
            const purchasesRef = ref(db, 'purchases');
            onValue(purchasesRef, (snapshot) => {
                const data = snapshot.val();
                const items = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                setPurchases(items);
            });
        } catch (error) {
          console.error('Error updating list:', error);
        }
    }

    const deleteItem = async (id) => {
        console.log('deleteItem id:', id);
        try {
            await remove(ref(db, `purchases/${id}`));
            await updateList();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
    }

    return (
        <View style={styles.safeArea}>
            <View style={styles.containerBasic}>
                <TextInput
                    placeholder='Product'
                    onChangeText={product => setProduct(product)}
                    value={product}
                    style={styles.input} />
                <TextInput
                    placeholder='Amount'
                    onChangeText={amount => setAmount(amount)}
                    value={amount}
                    style={styles.input} />
                <Button onPress={saveItem} title="Save" />
            </View>
            <View style={styles.containerResult}>
                <FlatList
                    ListHeaderComponent={<Text style={styles.textFlatListHeader}>Shopping List</Text>}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.containerShoppingList}>
                            <Text>
                                {item.product}, {item.amount}
                            </Text>
                            <Text style={styles.textButtonBought} onPress={() => deleteItem(item.id)}>
                                delete
                            </Text>
                        </View>}
                    data={purchases}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBasic: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 100
    },
    containerResult: {
        paddingTop: 8,
        alignItems: "center",
    },
    containerShoppingList: {
        flexDirection: 'row'
    },
    input: {
        height: 40,
        width: '70%',
        margin: 1,
        borderWidth: 1,
        padding: 8,
        margin: 10,
        paddingTop: 15,
    },
    safeArea: {
        flex: 1
    },
    textFlatListHeader: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center"
    },
    textButtonBought: {
        color: 'blue',
        marginLeft: 8
    }
});