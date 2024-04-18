import { View, StyleSheet } from "react-native"
import { useDispatch } from "react-redux";
import { addTrack } from "./TracksSlice"; 
import Icon from 'react-native-vector-icons/AntDesign';


export default function AddTrack({ track }) {

    // Dispatcher pour comminiquer les actions au store
    const dispatch = useDispatch();

    // On effectue l'action d'ajouter un nouveau morceau à la playlist
    const addNewTrack = () => {
        dispatch(addTrack(track))
    }

    // Bouton pour ajouter un morceau à la playlist
    return (
        <View style={styles.button}>
            <Icon
                name="hearto"
                size={25}
                color="#000"
                onPress={addNewTrack}
                accessibilityLabel="Ajouter le morceau"
                accessibilityHint="Ajouter ce morceau à votre playlist"
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