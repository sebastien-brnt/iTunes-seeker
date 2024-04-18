import { View, StyleSheet } from "react-native"
import { useDispatch } from "react-redux";
import { removeTrack } from "../slices/TracksSlice"; 
import Icon from 'react-native-vector-icons/AntDesign';


export default function RemoveTrack({ track }) {

    // Dispatcher pour communiquer les actions au store
    const dispatch = useDispatch();

    // On effectue l'action de retirer un morceau de la playlist
    const removePlaylistTrack = () => {
        dispatch(removeTrack(track.trackId))
    }

    // Bouton pour retirer un morceau de la playlist
    return (
        <View style={styles.button}>
            <Icon
                name="heart"
                size={25}
                color="#000"
                onPress={removePlaylistTrack}
                accessibilityLabel="Retirer le morceau"
                accessibilityHint="Retirer ce morceau de votre playlist"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});