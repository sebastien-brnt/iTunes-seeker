import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/AntDesign';


// Import des pages
import HomeScreen from './components/screens/HomeScreen';
import PlaylistScreen from './components/screens/PlaylistScreen';
import RatingsScreen from './components/screens/RatingsScreen';
import TrackDetailsScreen from './components/screens/TrackDetailsScreen';
import ArtistDetailsScreen from './components/screens/ArtistDetailsScreen';
import AlbumDetailsScreen from './components/screens/AlbumDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator(); // Permet de définir la pile de navigation

  return (
    // Logique de navigation de l'application :
    //    - 6 écrans : HomeScreen, PlaylistScreen, RatingsScreen, TrackDetailsScreen, ArtistDetailsScreen, AlbumDetailsScreen
    //    - Ecran de démarrage : HomeScreen

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerTitleStyle: styles.title }}>

            <Stack.Screen 
              name="Acceuil" 
              component={HomeScreen}
              options={() => {
                const navigation = useNavigation();
                return {
                  headerTitle: "Accueil",
                  headerRight: () => (
                    <Icon 
                      name="heart" 
                      size={25}
                      style={styles.icon} 
                      onPress={() => navigation.navigate('Playlist')}
                    />
                  ),
                  headerLeft: () => (
                    <Icon 
                      name="star" 
                      size={25}
                      style={styles.icon} 
                      onPress={() => navigation.navigate('Notations')}
                    />
                  )
                };
              }}></Stack.Screen>

            <Stack.Screen 
              name="Playlist" 
              component={PlaylistScreen}
              options={{ headerTitle: "Ma playlist" }}>
            </Stack.Screen>

            <Stack.Screen 
              name="Notations" 
              component={RatingsScreen}
              options={{ headerTitle: "Mes notations" }}>
            </Stack.Screen>

            <Stack.Screen 
              name="Morceau" 
              component={TrackDetailsScreen}
              options={{ headerTitle: "Morceau" }}>
            </Stack.Screen>

            <Stack.Screen 
              name="Artiste" 
              component={ArtistDetailsScreen}
              options={{ headerTitle: "Artiste" }}>
            </Stack.Screen>

            <Stack.Screen 
              name="Album" 
              component={AlbumDetailsScreen}
              options={{ headerTitle: "Album" }}>
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    color: '#000',
  }
});