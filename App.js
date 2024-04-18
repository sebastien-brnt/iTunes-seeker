import { StyleSheet, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import store from './store/store';


// Import des pages
import HomeScreen from './components/HomeScreen';
import PlaylistScreen from './components/PlaylistScreen';
import RatingsScreen from './components/RatingsScreen';
import TrackDetailsScreen from './components/TrackDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator(); // Permet de définir la pile de navigation

  return (
    // Logique de navigation de l'application :
    //    - 5 écrans : HomeScreen, PlaylistScreen, RatingsScreen, TrackDetailsScreen
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
                    onPress={() => navigation.navigate('Ratings')}
                  />
                )
              };
            }}></Stack.Screen>

          <Stack.Screen 
            name="Playlist" 
            component={PlaylistScreen}
            options={{ headerTitle: props => <Text style={styles.title}>Ma playlist</Text> }}></Stack.Screen>

          <Stack.Screen 
            name="Ratings" 
            component={RatingsScreen}
            options={{ headerTitle: props => <Text style={styles.title}>Mes notations</Text> }}></Stack.Screen>

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
  },
  icon: {
    marginRight: 10,
    color: '#000',
  }
});