import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ratingSelectorById } from './RatingsSlice.js';
import RatingDisplay from './RatingDisplay.js';
import { trackExists } from './TracksSlice.js';
import RemoveTrack from './RemoveTrack.js';
import AddTrack from './AddTrack.js';


export default function TrackItem({track}) {
    // Utilisation de la navigation
    const navigation = useNavigation();

    // Récupération de la note du morceau si il est dans la liste des morceaux noté
    const trackRating = useSelector(state => ratingSelectorById(state, track.trackId));

    // Vérifie si le morceau est dans la tracks list
    const isTrackPresent = useSelector(state => trackExists(state, track.trackId));

    return (
        // Affichages des informations dans l'item
        <TouchableOpacity onPress={() => navigation.navigate('Details', { track })}>
            <View style={styles.container}>
                <Image source={{ uri: track.artworkUrl100 }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.trackName}>{track.trackName}</Text>
                    <Text>{track.artistName}</Text>
                    
                    {/* On affiche la note du morceau si il est noté */}
                    {trackRating && <RatingDisplay rating={trackRating.rating} />}
                </View>

                {/* On affiche le composant en fonction de si le track est présent ou non dans la track list */}
                {isTrackPresent ? <RemoveTrack track={track} /> : <AddTrack track={track} />}
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