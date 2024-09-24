import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoriaScreen({ route }) {
  const { historia } = route.params;

  return (
    <View style={styles.container}>
      <Text>Historia</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
