import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import TrackItem from "./TrackItem";

export default function SearchResultScreen({ route }) {
  const { search } = route.params;
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  // Fonction pour effectuer une recherche avec l'API iTunes
  const searchWithAPI = async (term) => {
    if (!term) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      if (data.resultCount === 0) {
        setError('Aucun résultat trouvé.');
      } else {
        setResults(data.results);
      }
    } catch (error) {
      setError(`Erreur lors de la recherche : ${error.message}`);
    }
    setLoading(false);
  };

  // Lancement de la recherche
  useEffect(() => {
    searchWithAPI(search);
  }, [search]);


  // Affichage d'un message de chargement pendant la recherche
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.searchText}>Recherche en cours...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Affichage d'un message si aucun résultat n'est trouvé
  if (results.length <= 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun résultat trouvé.</Text>
      </View>
    );
  }

  // Affichage du résultat de la recherche lorsque le chargement est terminé et qu'il y a des résultats
  return (
    <View style={styles.container}>
      {/* Affichage du résultat de la recherche uniquement si il y a des résultats */}
      <FlatList
        style={styles.list}
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => <TrackItem track={item} />} // Utilisation du composant TrackItem pour afficher les informations du morceau
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchText: {
    marginBottom: 15,
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    width: "90%",
  },
});
