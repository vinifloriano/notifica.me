import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './Ranking';

const Ranking = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'notifica.me',
                
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

export default Ranking;