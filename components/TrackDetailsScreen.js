import { Text, View, Image, StyleSheet } from "react-native"

export default function TrackDetailsScreen({ route }) {
    // Récupération des informations du morceau
    const { track } = route.params;

    return (
        <View style={styles.container}>
            {track ? (
                <View>
                    <Image source={{ uri: track.artworkUrl100 }} />
                    <Text style={styles.title}>{track.trackName}</Text>
                </View>
            ) : (
                <Text style={styles.title}>Aucune information sur le morceau disponible.</Text>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'left',
    }
});
