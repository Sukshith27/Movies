import { createStackNavigator, createAppContainer } from 'react-navigation';
import Movies from './movies';
import MovieDetails from './movieDetails';
import Favorites from './favorites';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Movies,
    navigationOptions: {
      title: 'Latest Movies'
    }
  },
  Details: MovieDetails,
  Favorites:{ 
    screen: Favorites,
    navigationOptions: {
      title: 'Favorites'
    }
  }
},
  // {
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerVisible: false,
  //   }
  // }
);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;
