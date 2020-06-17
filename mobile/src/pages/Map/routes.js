import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './Map';
import Profile from './Profile';

const Map = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'notifica.me'
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#ff6461',
                
            },
            headerBackTitleVisible: false,
            headerTintColor: '#FFF',
        },
    })
);

export default Map;