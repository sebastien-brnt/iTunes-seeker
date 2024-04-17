import { View, StyleSheet, Button } from "react-native"
import { useDispatch } from "react-redux";
import { removeRating } from "./RatingsSlice"; 


export default function RemoveRating({ track }) {
    // Dispatcher pour comminiquer les actions au store
    const dispatch = useDispatch();

    // On effectue l'action de retirer un morceau de la la liste des morceaux notés
    const removeRatingInList = () => {
        dispatch(removeRating(track.trackId))
    }


    return (    
        <View style={styles.button}>
            <Button title="Retirer ma note" onPress={removeRatingInList}/>
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