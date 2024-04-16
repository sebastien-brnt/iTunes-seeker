import { Text, FlatList, View, StyleSheet } from "react-native";
import TrackItem from "./TrackItem";
import { useSelector } from "react-redux";
import { trackSelector } from "./TracksSlice";

export default function OtherScreen({route, navigation}) {
    // Récupération des morceaux de la playlist
    const tracks = useSelector(trackSelector);

    return (
        <View style={styles.container}>
            {/* Liste des morceau de la playlist */}
            {tracks.length >= 1 ? (
                <FlatList
                data={tracks}
                keyExtractor={(item) => item.trackId ? item.trackId.toString() : item.collectionId.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant TrackItem pour afficher les informations du morceau
                    <TrackItem track={item} />
                )}/>
            ) : (
                // Message si aucun résultat n'est trouvé
                <Text style={styles.emptyPlaylist}>Votre playlist ne contient aucun morceau pour le moment.</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    emptyPlaylist: {
        marginTop: 50,
        textAlign: 'center',
    }
});