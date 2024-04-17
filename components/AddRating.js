import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRating } from './RatingsSlice';
import { Picker } from '@react-native-picker/picker';

export default function AddRating({ track }) {
    const [rating, setRating] = useState(3);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newRating = {
            track: track,
            rating: rating
        };
        dispatch(addRating(newRating));
    };

    return (
        <View>
            <Text>Notez ce morceau (1-5) :</Text>
            <Picker
                selectedValue={rating}
                onValueChange={(itemValue) => setRating(itemValue)}>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
            </Picker>
            <View style={styles.button}>
                <Button
                    title="Valider ma note"
                    onPress={handleSubmit}
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
});
