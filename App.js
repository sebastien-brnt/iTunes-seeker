import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';

// Import des pages
import HomeScreen from './components/HomeScreen';
import PlaylistScreen from './components/PlaylistScreen';
import SearchResultScreen from './components/SearchResultScreen';

export default function App() {
  const Stack = createNativeStackNavigator(); // Permet de définir la pile de navigation

  return (
    // Logique de navigation de l'application :
    //    - 3 écrans : HomeScreen, PlaylistScreen, SearchResultScreen
    //    - Ecran de démarrage : HomeScreen

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerTitle: props => <Text style={styles.title}>Accueil</Text> }}></Stack.Screen>

        <Stack.Screen 
          name="Playlist" 
          component={PlaylistScreen}
          options={{ headerTitle: props => <Text style={styles.title}>Ma playlist</Text> }}></Stack.Screen>

        <Stack.Screen 
          name="SearchResult" 
          component={SearchResultScreen}
          options={{ headerTitle: props => <Text style={styles.title}>Résultat de recherche</Text> }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});