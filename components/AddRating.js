import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRating } from './RatingsSlice';
import { Picker } from '@react-native-picker/picker';

export default function AddRating({ track }) {
    const [rating, setRating] = useState(1);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newRating = {
            trackId: track.trackId,
            rating: rating
        };
        dispatch(addRating(newRating));
    };

    return (
        <View style={styles.container}>
            <Text>Rating (1-5):</Text>
            <Picker
                selectedValue={rating}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setRating(itemValue)}>
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
            </Picker>
            <Button
                title="Ajouter la note"
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
