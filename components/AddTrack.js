import { View, Button } from "react-native"
import { useDispatch } from "react-redux";
import { addTrack } from "./TracksSlice"; 

export default function AddTrack({ track }) {

    // Dispatcher pour comminiquer les actions au store
    const dispatch = useDispatch();

    // On effectue l'action d'ajouter une nouvelle tâche
    const addNewTrack = () => {
        dispatch(addTrack(track))
    }


    return (    
        <View>
            <Button title="Ajouter à ma playlist" onPress={addNewTrack}/>
        </View>
    )
}