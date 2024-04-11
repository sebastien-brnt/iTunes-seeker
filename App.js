import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import des pages
import HomeScreen from './components/HomeScreen';
import PlaylistScreen from './components/PlaylistScreen';
import SearchResultScreen from './components/SearchResultScreen';

export default function App() {
  const Stack = createNativeStackNavigator() ; // Permet de définit la pile de navigation

  return (
    // Logique de navigation dans l'application
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Playlist" component={PlaylistScreen}></Stack.Screen>
        <Stack.Screen name="SearchResult" component={SearchResultScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
