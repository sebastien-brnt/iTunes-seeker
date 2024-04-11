import { Text, View, StyleSheet } from "react-native"

export default function TrackDetailsScreen(props) {
    // Récupération des information du morceau
    const track = props.track;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{track.trackName}</Text>
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