import { Text, View, StyleSheet, Button, TextInput } from "react-native"
import { useState } from "react";

export default function HomeScreen({navigation}) {
    // Variables spécifiques à la recherche
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Rechercher un morceau</Text>

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

                    <Button 
                        title="Rechercher" 
                        onPress={() => navigation.navigate('SearchResult', {search})} 
                        disabled={search.length < 3}></Button>
                </View>


                <Text style={styles.title}>Accès rapide</Text>
                 {/* Accès à la playlist */}
                <Button title="Ma playlist" onPress={() => navigation.navigate('Playlist')}></Button>
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
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'left',
    },
    rowInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 70,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#e1e1e1'
    }
});