import { FlatList } from "react-native"
import ArtistItem from "./ArtistItem";
import TrackItem from "./TrackItem";
import AlbumItem from "./AlbumItem";

export default function SearchResultList(props) {

    const type = props.type;
    const results = props.results;

    if (type === 'musicTrack') {
        return (
            <FlatList
                data={results}
                keyExtractor={(item, index) => item.trackId ? item.trackId.toString() : index.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant TrackItem pour afficher les informations du morceau
                    <TrackItem track={item} />
                )}
            />
        );
    } else if (type === 'musicArtist') {
        return (
            <FlatList
                data={results}
                keyExtractor={(item, index) => item.artistId ? item.artistId.toString() : index.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant ArtistItem pour afficher les informations du morceau
                    <ArtistItem artist={item} />
                )}
            />
        );
    } else if (type === 'album') {
        return (
            <FlatList
                data={results}
                keyExtractor={(item, index) => item.collectionId ? item.collectionId.toString() : index.toString()}
                renderItem={({ item }) => (
                    // Utilisation du composant ArtistItem pour afficher les informations du morceau
                    <AlbumItem album={item} />
                )}
            />
        );
    }
}