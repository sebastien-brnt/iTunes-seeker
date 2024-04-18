import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function DisplayRating({ rating, size = 15 }) {
    // Récupération la note et conversion en nombre entier
    const validRating = Math.max(0, Math.floor(Number(rating)));

    // Tableau de la longueur de la note afin de faire un map dessus et afficher le bon nombre d'étoiles
    const items = new Array(validRating).fill(null);


    // Affcihage d'icon étoile en fonction de la note
    return (
        <View style={styles.ratingRow}>
            {items.map((item, index) => (
                <Icon 
                    name="star" 
                    size={size}
                    key={index}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
});