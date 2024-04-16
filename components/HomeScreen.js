import { Text, View, StyleSheet, Button, TextInput, FlatList, ActivityIndicator } from "react-native"
import { useState, useEffect } from "react";
import TrackItem from "./TrackItem";

export default function HomeScreen({navigation}) {
    // Variables spécifiques à la recherche
    const [search, setSearch] = useState('Chargé kaaris');
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

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Rechercher un morceau</Text>

                {/* Barre de recherche */}
                <View style={styles.rowInput}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Rechercher un morceaux, artiste, album..."
                        keyboardType="default"
                    />
                </View>

                {/* Affichage d'un message de chargement */}
                {loading ? (
                    <View style={styles.container}>
                        <Text style={styles.searchText}>Recherche en cours...</Text>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <Text></Text>
                )}


                {/* Affichage du résultat de la recherche lorsque le chargement est terminé */}
                {search.length >= 1 && (results.length > 0 ? (
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
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'left',
    },
    rowInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e1e1e1'
    }
});