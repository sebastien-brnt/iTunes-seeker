import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

export default function ArtistDetailsScreen({ route }) {
    // Récupération des informations de l'artiste
    const { artist } = route.params;
    
    if (!artist) {
        return <Text style={styles.noResult}>Aucune information sur cet artiste disponible.</Text>
    }

    return (
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

                    {/* Morceaux de l'artiste */}
                    <Text style={styles.title}>Morceaux de l'artiste</Text>
                </View>
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
