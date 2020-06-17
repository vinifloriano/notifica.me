import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TabNavigation from './tabNavigation';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Register,
        TabNavigation
    })
);

export default Routes;