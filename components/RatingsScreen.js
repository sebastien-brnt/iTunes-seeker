import { Text, FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ratingsSelector } from "./RatingsSlice";
import TrackItem from "./TrackItem";

export default function RatingsScreen({route, navigation}) {
    // Récupération des morceaux de la playlist
    const ratings = useSelector(ratingsSelector);

    return (
        <View style={styles.container}>
            {/* Liste des morceau ayant reçu une note */}
            {ratings.length >= 1 ? (
                <FlatList
                data={ratings}
                keyExtractor={(item) => item.track.trackId ? item.track.trackId.toString() : item.track.collectionId.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant TrackItem pour afficher les informations du morceau
                    <TrackItem track={item.track} rating={item.rating} />
                )}/>
            ) : (
                // Message si aucun résultat n'est trouvé
                <Text style={styles.emptyPlaylist}>Vous n'avez noté aucun moceau pour le moment.</Text>
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