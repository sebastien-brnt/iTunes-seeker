import { Text, FlatList, View, StyleSheet } from "react-native";
import TrackItem from "../common/TrackItem";
import { useSelector } from "react-redux";
import { trackSelector } from "../slices/TracksSlice";

export default function PlaylistScreen() {
    // Récupération des morceaux de la playlist
    const tracks = useSelector(trackSelector);

    // Affichage d'un message si aucun morceau n'a été noté
    if (tracks.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.textEmptyPlaylist}>Votre playlist ne contient aucun morceau pour le moment.</Text>
            </View>
        );
    }

    // Affichage de la liste des morceaux de la playlist
    return (
        <View style={styles.container}>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.trackId ? item.trackId.toString() : item.collectionId.toString()}
                renderItem={({ item }) => ( <TrackItem track={item} /> )}  // Utilisation du composant TrackItem pour afficher les informations du morceau
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    textEmptyPlaylist: {
        marginTop: 50,
        textAlign: 'center',
    }
});