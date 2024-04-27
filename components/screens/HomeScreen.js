import { Text, View, StyleSheet, TextInput, FlatList, ActivityIndicator } from "react-native"
import { useState, useEffect, useRef } from "react";
import SearchResultList from "../common/SearchResultList";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/AntDesign';

export default function HomeScreen({navigation}) {
    // Variables spécifiques à la recherche
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('musicTrack');
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const abortControllerRef = useRef(null);

    const searchTypeList = [
        {title: 'Musiques', icon: 'customerservice', type: 'musicTrack'},
        {title: 'Artiste', icon: 'user', type: 'musicArtist'},
        {title: 'Album', icon: 'book', type: 'album'},
    ];
   
   
    // Fonction pour effectuer une recherche avec l'API iTunes
    const searchWithAPI = async (term) => {

          // Annuler la requête précédente si elle est toujours en cours
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Nouveau AbortController pour la nouvelle requête
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        // Réinitialisation des résultats et du chargement
        setResults([]);
        setLoading(true);

        // Si la recherche est vide, on arrête
        if (!term) {
          setLoading(false);
          return;
        }

        // Attribut spécifiques à chaque type de recherche
        let attribute = '&attribute=';
        switch (searchType) {
            case 'musicArtist':
                attribute += 'artistTerm';
                break;
        
            default:
                break;
        }

        // Requête à l'API iTunes
        try {
            const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=${searchType}&pays=FR${attribute}`
            );

            const data = await response.json();

            if (data.results) {
                setResults(data.results); // Mise à jour des résultats
            }

            setLoading(false);
        } catch (error) {
            console.log("Erreur lors de la recherche :", error);
            setLoading(false);
        }

        setLoading(false);
    };

    // Lancement de la recherche
    useEffect(() => {
        searchWithAPI(search);

        return () => {
            // Annuler la requête si le composant est démonté
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [search]);


    return (
        <View style={styles.container}>
                <Text style={styles.title}>Rechercher un morceau</Text>

                {/* Sélecteur pour choisir le type de recherche */}
                <SelectDropdown
                    data={searchTypeList}
                    onSelect={(selectedItem) => { 
                        setSearchType(selectedItem.type); 
                        setSearch('') 
                    }}
                    renderButton={(selectedItem, isOpened) => { // Rendu du bouton
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {selectedItem && (
                                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                )}
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.title) || 'Type de recherche'}
                                </Text>
                                <Icon name={isOpened ? 'up' : 'down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => { // Rendu de l'élément
                        return (
                            <View style={[styles.dropdownItemStyle, isSelected && {backgroundColor: '#D2D9DF'}]}>
                                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />

                {/* Barre de recherche */}
                <View style={styles.rowInput}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSearch}
                        value={search}
                        placeholder="Rechercher un morceaux, artiste, album..."
                        keyboardType="default"
                    />
                </View>

                {/* Affichage d'un message de chargement */}
                {loading ? (
                    <View style={styles.loading}>
                        <Text style={styles.searchText}>Recherche en cours...</Text>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    null
                )}


                {/* Affichage du résultat de la recherche lorsque le chargement est terminé */}
                {search.length >= 1 && !loading && (results.length > 0 ? (
                    // Affichage de la liste des résultats via le composant SearchResultList
                    <SearchResultList type={searchType} results={results} />
                    
                ) : (
                    // Message si aucun résultat n'est trouvé
                    <Text style={styles.noResult}>Aucun résultat trouvé.</Text>
                ))}
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
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e1e1e1',
    },
    loading: {
        alignItems: 'center',
        marginTop: 20,
    },
    searchText: {
        marginBottom: 15,
    },
    noResult: {
        marginTop: 20,
        textAlign: 'center'
    },

    // Dropdown styles
    dropdownButtonStyle: {
      width: '100%',
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 20,
    },
    dropdownButtonIconStyle: {
      fontSize: 20,
      marginRight: 5,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 20,
      marginRight: 8,
    },
});