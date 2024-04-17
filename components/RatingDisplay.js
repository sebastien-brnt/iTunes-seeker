import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function RatingDisplay(props) {
    const navigation = useNavigation();

    // Récupération la note
    const rating = Number(props.rating);

    // Tableau de la longueur de la note afin de faire un map dessus et afficher le bon nombre d'étoiles
    const items = new Array(rating).fill(null);

    return (
        <View style={styles.ratingRow}>
            {items.map((item, index) => (
                // Affcihage d'icon star en fonction de la note
                <Icon 
                name="star" 
                size={15}
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