import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function TrackItem(props) {
    const navigation = useNavigation();

    // Récupération des informations du morceau
    const track = props.track;

    return (
        // Affichages des informations dans l'item
        <TouchableOpacity onPress={() => navigation.navigate('TrackDetails', { track: track })}>
            <View style={styles.container}>
                <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.trackName}>{track.trackName}</Text>
                    <Text>{track.artistName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 5,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 5,
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
    },
    trackName: {
        fontWeight: 'bold',
    }
});