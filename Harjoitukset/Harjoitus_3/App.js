import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [eka, setEka] = useState("");
  const [toka, setToka] = useState("");
  const [vastaus, setVastaus] = useState(null);
  const [historia, setHistoria] = useState([]);

  const plusLasku = () => {
    const result = parseFloat(eka) + parseFloat(toka);
    setVastaus(result);
    setHistoria([...historia, { key: `${eka} + ${toka} = ${result}` }]);
  };

  const miinusLasku = () => {
    const result = parseFloat(eka) - parseFloat(toka);
    setVastaus(result);
    setHistoria([...historia, { key: `${eka} - ${toka} = ${result}` }]);
  };

  const tyhjenna = () => {
    setEka("");
    setToka("");
    setVastaus(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput style={{ borderWidth: 1, marginTop: 10, width: 100 }}
          keyboardType='numeric'
          placeholder='1. luku'
          onChangeText={text => setEka(text)}
          value={eka}
        />
        <TextInput style={{ borderWidth: 1, marginTop: 10, width: 100 }}
          keyboardType='numeric'
          placeholder='2. luku'
          onChangeText={text => setToka(text)}
          value={toka}
        />
      </View>
      <View style={styles.buttonBox}>
        <Button onPress={plusLasku} title="+" />
        <Button onPress={miinusLasku} title="-" />
        <Button onPress={tyhjenna} title="C" />
      </View>
      <View>
        {vastaus !== null && (
          <Text style={{ marginTop: 20, fontSize: 20 }}>
            Vastaus: {vastaus}
          </Text>
        )}
      </View>
      <FlatList
        data={historia}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 200,
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 20,
    justifyContent: 'space-between',
    width: '30%',
  }
});