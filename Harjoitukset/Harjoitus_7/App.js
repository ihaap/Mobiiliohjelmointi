import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [rates, setRates] = useState({});
  const [selected, setSelected] = useState('AED'); // Default-arvo (aakkojärjestys)
  const [amount, setAmount] = useState('');
  const [eur, setEur] = useState('');

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    const url = 'https://api.apilayer.com/exchangerates_data/latest';
    const options = {
      headers: {
        apikey: 'INSERT_YOUR_API_KEY_HERE'
      }
    };

    try {
      const response = await fetch(url, options);
      const currencyData = await response.json();
      setRates(currencyData.rates);
    } catch (e) {
      Alert.alert('Error fetching data');
    }
  };

  const convert = () => {
    if (!amount) {
      Alert.alert('Error', 'Amount field cannot be empty!');
      return;
    }
    const amountEur = Number(amount) / rates[selected];
    setEur(`${amountEur.toFixed(2)}€`);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />
      <Text style={styles.result}>{eur}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <Text style={styles.helpText}>Choose a currency to convert into EUR</Text>
      <Picker
        style={styles.picker}
        selectedValue={selected}
        onValueChange={setSelected}
      >
        {Object.keys(rates).sort().map(key => (
          <Picker.Item label={key} value={key} key={key} />
        ))}
      </Picker>
      <Button title="Convert" onPress={convert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  result: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1,
  },
  helpText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  picker: {
    width: 150,
    marginBottom: 20,
  },
});