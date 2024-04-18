import { Text, FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ratingsSelector } from "./RatingsSlice";
import TrackItem from "./TrackItem";

export default function RatingsScreen() {
    // Récupération des morceaux de la playlist
    const ratings = useSelector(ratingsSelector);


    // Affichage d'un message si aucun morceau n'a été noté
    if (ratings.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.textEmptyList}>Vous n'avez noté aucun morceau pour le moment.</Text>
            </View>
        );
    }

    // Affichage de la liste des morceaux notés
    return (
        <View style={styles.container}>
            <FlatList
                data={ratings}
                keyExtractor={(item) => item.track.trackId.toString()}
                renderItem={({ item }) => ( <TrackItem track={item.track} /> )} // Utilisation du composant TrackItem pour afficher les informations du morceau
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
    textEmptyList: {
        marginTop: 50,
        textAlign: 'center',
    }
});