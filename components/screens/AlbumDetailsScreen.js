import { Text, View, StyleSheet, FlatList, Image, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import TrackItem from "../common/TrackItem";

export default function ArtistDetailsScreen({ route }) {
    // Récupération des informations de l'album
    const { album } = route.params;
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fonction pour récupérer les données de l'album
    async function getData() {
        try {
            setLoading(true);

            // Récupérer les données de l'album via l'API iTunes
            const response = await fetch(`https://itunes.apple.com/search?term=${album.collectionName}+${album.artistName}&entity=song&pays=FR`);
            const data = await response.json();
            
            // On supprime les doublons de l'album
            const unique = data.results.filter((v, i, a) => a.findIndex(t => (t.trackName === v.trackName)) === i);

            // On filtre uniquement les morceaux de l'album avec le collectionId
            const albumTracks = unique.filter(track => track.collectionId === album.collectionId);

            setLoading(false);

            return albumTracks;
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        }
    }

    // Récupération des morceaux de l'album
    useEffect(() => {
        getData('song').then(setTracks);
    }, []);
    
    if (!album) {
        return <Text style={styles.noResult}>Aucune information sur cet album disponible.</Text>
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.ScrollView}>
                <View style={styles.container}>
                    <View>
                        {/* Header de l'artiste */}
                        <View style={styles.header}>
                            <Image
                                source={{ uri: album.artworkUrl100 }}
                                style={styles.image} 
                            />

                            <View>
                                <Text style={styles.collectionName}>{album.collectionName}</Text>
                                <Text style={styles.artistName}>{album.artistName}</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.title}>Détails de l'album</Text>
                            <Text style={styles.detail}>Nombre de morceaux : {album.trackCount}</Text>
                            <Text style={styles.detail}>Genre : {album.primaryGenreName}</Text>
                            <Text style={styles.detail}>Date de sortie : {album.releaseDate}</Text>
                            <Text style={styles.detail}>Copyright : {album.copyright}</Text>
                        </View>


                        {/* Morceaux de l'album */}
                        <Text style={styles.title}>Morceaux de l'album</Text>

                        {/* Chargement */}
                        {loading && 
                            <View style={styles.loading}>
                                <Text style={styles.searchText}>Chargement...</Text>
                                <ActivityIndicator size="large" />
                            </View>
                        }

                        {/* Résultats */}
                        {!loading && ( tracks && tracks.length !== 0 ?
                            <View>
                                <FlatList
                                    data={tracks}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => item.trackId}
                                    renderItem={({ item }) => (
                                        <TrackItem track={item} />
                                    )}
                                />
                            </View>
                            :
                            <Text style={styles.noResult}>Aucun morceau trouvé pour cet album.</Text>
                        )}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    safeAreaView: {
        backgroundColor: '#fff',
        flex: 1
    },
    ScrollView: {
        flex: 1
    },
    loading: {
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'left',
        maxWidth: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    collectionName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5
    },
    detail: {
        marginBottom: 5
    },
    noResult: {
        marginTop: 5,
    }
});
