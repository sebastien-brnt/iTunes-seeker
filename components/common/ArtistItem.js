import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function ArtistItem({artist}) {
    // Utilisation de la navigation
    const navigation = useNavigation();

    return (
        // Affichages des informations dans l'item
        <TouchableOpacity onPress={() => navigation.navigate('Details', { artist })}>
            <View style={styles.container}>
                {/* <Image source={{ uri: artist.artworkUrl100 }} style={styles.image} /> */}
                <Icon name="user" size={35} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.artistName}>{artist.artistName}</Text>
                    <Text>{artist.primaryGenreName}</Text>
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
        borderRadius: 300,
    },
    detailsContainer: {
        flex: 1,
        padding: 10,
    },
    artistName: {
        fontWeight: 'bold',
    },
});