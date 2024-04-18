import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRating } from '../slices/RatingsSlice';
import { Picker } from '@react-native-picker/picker';

export default function AddRating({ track }) {
    const [rating, setRating] = useState(3);

    // Dispatcher pour comminiquer les actions au store
    const dispatch = useDispatch();


    // Fonction pour ajouter une note
    const addNewRating = () => {
        // Création de l'objet de la note
        const newRating = {
            track: track,
            rating: rating
        };

        dispatch(addRating(newRating));
    };

    return (
        <View>
            <Text>Notez ce morceau (1-5) :</Text>
            
            {/* Sélecteur pour choisir la note */}
            <Picker
                selectedValue={rating}
                onValueChange={(itemValue) => setRating(itemValue)}
                style={styles.picker}
            >
                {/* Création des options pour la note */}
                {Array.from({ length: 5 }, (item, i) => (
                    <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
                ))}
            </Picker>

            <View style={styles.button}>
                <Button
                    title="Valider ma note"
                    onPress={addNewRating}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    picker: {
        width: '100%',
        backgroundColor: '#fff',
    }
});
