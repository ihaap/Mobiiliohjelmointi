import { useState } from 'react';
import { Text, TextInput, FlatList, Alert, StyleSheet, Pressable, View, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searched, setSearched] = useState(false);

  const getRecipes = async () => {
    setSearched(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      if (!response.ok) {
        throw new Error('Virhe! Kokeile uudelleen!');
      }
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
        console.log(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      Alert.alert('Virhe:', error.message);
    }
  };

  const listSeparator = () => (
    <View style={styles.separator} />
  );

  const listEmpty = () => (
    searched && <Text style={styles.list}>Reseptejä ei löytynyt!</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setIngredient}
          placeholder="Etsi reseptejä ainesosan perusteella (englanniksi)"
        />
        <Pressable style={styles.button} onPress={getRecipes}>
          <Text style={styles.buttonText}>Etsi</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => String(item.idMeal)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{ uri: item.strMealThumb }}
            />
          </View>
        )}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={listEmpty}
        data={recipes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    height: 60,
    borderColor: 'green',
    borderStyle: 'dotted',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '80%',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginLeft: '10%',
  },
  image: {
    width: 100,
    height: 100,
  },
  list: {
    width: '100%',
  },
});