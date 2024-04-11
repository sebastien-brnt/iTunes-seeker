import { Text, View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import TrackItem from "./TrackItem";

export default function SearchResultScreen({ route, navigation }) {
  const { search } = route.params;
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fonction pour effectuer une recherche avec l'API iTunes
    const searchWithAPI = async (term) => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(term)}`
        );
        const data = await response.json();
        setResults(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
        setLoading(false);
      }
    };

    // Lancement de la recherche
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

  // Affichage du résultat de la recherche lorsque le chargement est terminé
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre recherche : {search}</Text>
  
      {/* Affichage du résultat de la recherche uniquement si il y a des résultats */}
      {results.length > 0 ? (
        <FlatList
          style={styles.list}
          data={results}
          keyExtractor={(item) => item.trackId ? item.trackId.toString() : item.collectionId.toString()}
          renderItem={({ item }) => (
            // Utilisation du composant TrackItem pour afficher les informations du morceau
            <TrackItem track={item} />
          )}
        />
      ) : (
        // Message si aucun résultat n'est trouvé
        <Text>Aucun résultat trouvé.</Text>
      )}
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
