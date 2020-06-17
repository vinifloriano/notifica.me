import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Ranking from './pages/Ranking/routes';
import Home from './pages/Home/routes';
import Map from './pages/Map/routes';
import Login from './pages/Login/Login';

const TabNabigation = createAppContainer(
    createBottomTabNavigator({
        Ranking: {
            screen: Ranking,
            navigationOptions: {
                title: 'Ranking',
                tabBarIcon: () => {
                    return <MaterialIcons name='format-list-numbered' size={30} color='#ff6461' />
                }
            },
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
                tabBarIcon: () => {
                    return <MaterialIcons name='home' size={30} color='#ff6461' />
                }
            },
        },
        Mapa: {
            screen: Map,
            navigationOptions: {
                title: 'Mapa',
                tabBarIcon: () => {
                    return <MaterialIcons name='map' size={30} color='#ff6461' />
                }
            },
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            activeTintColor: '#df4441',
            inactiveTintColor: '#ff6461',
            
        }
    }),
);

export default TabNabigation;