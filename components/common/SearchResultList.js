import { FlatList } from "react-native"
import ArtistItem from "./ArtistItem";
import TrackItem from "./TrackItem";

export default function SearchResultList(props, { navigation }) {

    const type = props.type;
    const results = props.results;

    if (type === 'musicTrack') {
        return (
            <FlatList
                data={results}
                keyExtractor={item => item.trackId ? item.trackId.toString() : item.collectionId.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant TrackItem pour afficher les informations du morceau
                    <TrackItem track={item} navigation={navigation} />
                )}
            />
        );
    } else if (type === 'musicArtist') {
        return (
            <FlatList
                data={results}
                keyExtractor={item => item.artistId ? item.artistId.toString() : item.amgArtistId.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant ArtistItem pour afficher les informations du morceau
                    <ArtistItem artist={item} navigation={navigation} />
                )}
            />
        );
    } else if (type === 'album') {
        return (
            <FlatList
                data={results}
                keyExtractor={item => item.artistId ? item.artistId.toString() : item.amgArtistId.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant ArtistItem pour afficher les informations du morceau
                    <ArtistItem artist={item} navigation={navigation} />
                )}
            />
        );
    }
}