import { Text, View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { trackExists } from "./TracksSlice";
import AddRating from "./AddRating";
import AddTrack from "./AddTrack";
import RemoveTrack from "./RemoveTrack";
import { ratingSelectorById } from "./RatingsSlice";
import RatingDisplay from "./RatingDisplay";
import RemoveRating from "./RemoveRating";

export default function TrackDetailsScreen({ route }) {
    // Récupération des informations du morceau
    const { track } = route.params;
    let trackRating = undefined;

    // Vériication de l'existence du morceau dans la playlist
    const isTrackPresent = useSelector(state => trackExists(state, track.trackId));

    // Récupération de la note du morceau si il est dans la liste des morceaux noté
    trackRating = useSelector(state => ratingSelectorById(state, track.trackId));
    

    // Fonction pour formater le temps en minutes et secondes
    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}min ${seconds < 10 ? '0' : ''}${seconds}s`;
    }

    return (
        <View style={styles.container}>
            {track ? (
                <View>
                    {/* Header du morceau */}
                    <View style={styles.header}>
                        <Image
                        source={{ uri: track.artworkUrl100 }}
                        style={styles.image} />

                        <View>
                            <Text style={styles.trackName}>{track.trackName}</Text>
                            <Text style={styles.artistName}>{track.artistName}</Text>

                            {/* Boutons pour ajouter / retirer le morceau à la playlist */}
                            <View style={styles.playlistButton}>
                                {isTrackPresent ? (
                                    <RemoveTrack track={track}/>
                                ) : (
                                    <AddTrack track={track}/>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Information du morceau */}
                    <Text style={styles.title}>Détails du morceau</Text>

                    <Text style={styles.detail}>Durée : {formatTime(track.trackTimeMillis)}</Text>
                    <Text style={styles.detail}>Date de sortie : {track.releaseDate}</Text>
                    <Text style={styles.detail}>Type de musique : {track.primaryGenreName}</Text>
                    <Text style={styles.detail}>Album : {track.collectionName}</Text>

                    {/* Notation du morceau */}
                    <Text style={styles.title}>Notation</Text>
                    {trackRating ? 
                        <View>
                            <Text style={styles.detail}>Vous avez noté ce morceau, voici votre note :</Text>
                            <RatingDisplay rating={trackRating.rating} size="20" />
                            <RemoveRating track={track} />
                        </View>
                    : 
                        <AddRating track={track} />
                    }
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20,
    },
    trackName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5
    },
    playlistButton: {
        marginTop: 10,
    },
    detail: {
        marginBottom: 5
    }
});
