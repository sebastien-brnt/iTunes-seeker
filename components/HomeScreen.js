import { Text, View, StyleSheet, Button, TextInput } from "react-native"
import { useState } from "react";

export default function HomeScreen({navigation}) {
    // Variables spécifiques à la recherche
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
                <Text>Recherche</Text>

                {/* Barre de recherche */}
                <View style={styles.rowInput}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Rechercher un morceaux, artiste, album..."
                        keyboardType="default"
                        onSubmitEditing={() => navigation.navigate('SearchResult', {search})}
                    />
                    <Button title="Rechercher" onPress={() => navigation.navigate('SearchResult', {search})}></Button>
                </View>

                {/* Accès à la playlist */}
                <Button title="Ma playlist" onPress={() => navigation.navigate('Playlist')}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowInput: {
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e1e1e1'
    }
});