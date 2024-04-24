import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function AlbumItem({ album }) {
    // Utilisation de la navigation
    const navigation = useNavigation();

    return (
        // Affichages des informations dans l'item
        <TouchableOpacity onPress={() => navigation.navigate('Album', { album })}>
            <View style={styles.container}>
                <Image source={{ uri: album.artworkUrl60 }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.collectionName} numberOfLines={1} ellipsizeMode='tail'>{album.collectionName}</Text>
                    <Text>{album.trackCount} morceau{album.trackCount > 1 ? 'x' : ''}</Text>
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
    collectionName: {
        fontWeight: 'bold',
        paddingRight: 15,
    }
});