import { Text, View, StyleSheet, FlatList, ScrollView, SafeAreaView, Button } from "react-native";
import { useEffect, useState } from "react";
import TrackItem from "../common/TrackItem";
import Icon from 'react-native-vector-icons/AntDesign';

export default function ArtistDetailsScreen({ route }) {
    // Récupération des informations de l'artiste
    const { artist } = route.params;
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [viewMoreTrack, setViewMoreTrack] = useState(true);
    const [viewMoreAlbum, setViewMoreAlbum] = useState(true);

    // Fonction pour récupérer les données de l'artiste
    async function getData(type, limit = 10) {
        try {
            // Récupérer les données de l'artiste via l'API iTunes
            const response = await fetch(`https://itunes.apple.com/lookup?id=${artist.artistId}&entity=${type}&limit=${limit}`);
            const data = await response.json();
            
            // Si le type est song on retire le premier élément qui est l'artiste
            if (type === 'song') {
                data.results.shift();
            }
            
            return data.results;
        } catch (error) {
            console.error("Erreur lors de la recherche :", error);
        }
    }


    // Récupération des albums et des morceaux de l'artiste
    useEffect(() => {
        getData('album').then(setAlbums);
        getData('song').then(setTracks);
    }, []);


    // Fonction pour afficher plus de morceaux et d'albums
    const viewMore = (type) => () => {
        const limit = type === 'track' ? (viewMoreTrack ? 'allTracks' : 10) : (viewMoreAlbum ? 'allAlbums' : 10);
        if (type === 'track') {
            getData('song', limit).then(setTracks); // Récupération de tous les morceaux
            setViewMoreTrack(!viewMoreTrack);
        } else {
            getData('album', limit).then(setAlbums); // Récupérarion de tous les albums
            setViewMoreAlbum(!viewMoreAlbum);
        }
    };
    
    if (!artist) {
        return <Text style={styles.noResult}>Aucune information sur cet artiste disponible.</Text>
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        {/* Header de l'artiste */}
                        <View style={styles.header}>
                            <Icon name="user" size={35} style={styles.icon}/>

                            <View>
                                <Text style={styles.artistName}>{artist.artistName}</Text>
                                <Text style={styles.primaryGenreName}>{artist.primaryGenreName}</Text>
                            </View>
                        </View>

                        {/* Album de l'artiste */}
                        <Text style={styles.title}>Album de l'artiste</Text>
                        <FlatList
                            data={albums}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.collectionId}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.collectionName}</Text>
                                </View>
                            )}
                        />
                        { viewMoreAlbum ?
                            <Button title="Voir plus" onPress={viewMore('album')} />
                            : 
                            <Button title="Voir moins" onPress={viewMore('album')} />
                        }

                        {/* Morceaux de l'artiste */}
                        <Text style={styles.title}>Morceaux de l'artiste</Text>
                        <FlatList
                            data={tracks}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.trackId}
                            renderItem={({ item }) => (
                                <TrackItem track={item} />
                            )}
                        />
                        { viewMoreTrack ?
                            <Button title="Voir plus" onPress={viewMore('track')} />
                            : 
                            <Button title="Voir moins" onPress={viewMore('track')} /> 
                        }
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'left',
        maxWidth: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    icon: {
        marginRight: 20,
    },
    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5
    },
    noResult: {
        marginTop: 20,
        textAlign: 'center'
    }
});
