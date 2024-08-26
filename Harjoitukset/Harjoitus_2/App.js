import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {
  const [satunnaisluku, setSatunnaisluku] = useState(Math.floor(Math.random() * 100) + 1);
  const [arvaukset, setArvaukset] = useState(0);
  const [arvaus, setArvaus] = useState("");
  const [vastaus, setVastaus] = useState(null);

  const pelaa = () => {
    if (arvaus === "") {
      Alert.alert("Sinun tulee syöttää luku ennen kun voit arvata!");
      return;
    }

    const arvauksesi = parseInt(arvaus);
    setArvaukset(arvaukset + 1);

    if (arvauksesi < satunnaisluku) {
      setVastaus(`Luku ${arvauksesi} on liian pieni, yritä uudelleen!`);
    } else if (arvauksesi > satunnaisluku) {
      setVastaus(`Luku ${arvauksesi} on liian suuri, yritä uudelleen!`);
    } else {
      setVastaus(`Oikein! Arvauksia: ${arvaukset + 1}`);
    }
  };

  const uusiPeli = () => {
    setSatunnaisluku(Math.floor(Math.random() * 100) + 1);
    setArvaukset(0);
    setArvaus("");
    setVastaus(null);
  };

  return (
    <View style={styles.container}>
      <Text>Arvaa numero väliltä 1-100!</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder=''
        onChangeText={text => setArvaus(text)}
        value={arvaus}
      />
      <View style={styles.buttonBox}>
        <Button onPress={pelaa} title="Arvaa" />
        <Button onPress={uusiPeli} title="Uusi peli" />
      </View>
      {vastaus && (
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          {vastaus}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    width: 100,
    textAlign: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 20,
    justifyContent: 'space-between',
    width: '50%',
  }
});