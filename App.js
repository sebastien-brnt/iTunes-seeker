import { StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from './store/store';


// Import des pages
import HomeScreen from './components/HomeScreen';
import PlaylistScreen from './components/PlaylistScreen';
import SearchResultScreen from './components/SearchResultScreen';
import TrackDetailsScreen from './components/TrackDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator(); // Permet de définir la pile de navigation

  return (
    // Logique de navigation de l'application :
    //    - 4 écrans : HomeScreen, PlaylistScreen, SearchResultScreen, TrackDetailsScreen
    //    - Ecran de démarrage : HomeScreen

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={() => {
              const navigation = useNavigation();
              return {
                headerTitle: props => <Text style={styles.title}>Accueil</Text>,
                headerRight: () => (
                  <Icon 
                    name="music" 
                    size={25} 
                    color="#000"  
                    onPress={() => navigation.navigate('Playlist')}
                  />
                )
              };
            }}></Stack.Screen>

          <Stack.Screen 
            name="Playlist" 
            component={PlaylistScreen}
            options={{ headerTitle: props => <Text style={styles.title}>Ma playlist</Text> }}></Stack.Screen>

          <Stack.Screen 
            name="SearchResult" 
            component={SearchResultScreen}
            options={{ headerTitle: props => <Text style={styles.title}>Résultat de recherche</Text> }}></Stack.Screen>
          
          <Stack.Screen 
            name="TrackDetails" 
            component={TrackDetailsScreen}
            options={{ headerTitle: props => <Text style={styles.title}>Morceau</Text> }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});