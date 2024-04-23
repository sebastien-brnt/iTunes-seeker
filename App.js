import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import store from './store/store';


// Import des pages
import HomeScreen from './components/screens/HomeScreen';
import PlaylistScreen from './components/screens/PlaylistScreen';
import RatingsScreen from './components/screens/RatingsScreen';
import TrackDetailsScreen from './components/screens/TrackDetailsScreen';
import ArtistDetailsScreen from './components/screens/ArtistDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator(); // Permet de définir la pile de navigation

  return (
    // Logique de navigation de l'application :
    //    - 5 écrans : HomeScreen, PlaylistScreen, RatingsScreen, TrackDetailsScreen, ArtistDetailsScreen
    //    - Ecran de démarrage : HomeScreen

    <Provider store={store}>
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
            options={{ headerTitle: "Détails du moceau" }}>
          </Stack.Screen>

          <Stack.Screen 
            name="Artiste" 
            component={ArtistDetailsScreen}
            options={{ headerTitle: "Détails de l'artiste" }}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
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