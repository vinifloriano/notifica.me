import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './Home';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'notifica.me'
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

export default Routes;