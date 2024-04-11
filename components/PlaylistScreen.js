import { Text, View, StyleSheet } from "react-native"

export default function OtherScreen({route, navigation}) {
    return (
        <View style={styles.container}>
            <Text>My Playlist Page</Text>
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
});