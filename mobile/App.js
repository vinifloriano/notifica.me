import React, { useEffect } from 'react'; 
import { StatusBar, YellowBox } from 'react-native';
import axios from 'axios';
import Routes from './src/routes';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);



export default function App() {
  useEffect(()=>{
    async function componentWillMount(){
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    
      if(status !== 'granted') {
        status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    
      const token = await Notifications.getExpoPushTokenAsync();

      console.log(token);
      axios.post('https://exp.host/--/api/v2/push/send', {       
        body: {                 
          to: token,                        
          title: 'New Notification',                  
          body: 'The notification worked!',             
          priority: "high",            
          sound:"default",              
          channelId:"default",   
        },        
      }).then((response) => response.json())   
          .then((responseJson) => {  })
              .catch((error) => { console.log(error) });
    }
    componentWillMount();
  }, [])
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#ff6461' />
      <Routes />
    </>
  );
}

/*
const styles = StyleSheet.create({
  horizontalMenu: {
    flexDirection: "row",
  },
  menuItem: {
    flex: 1,
  },
  menuText: {
    textAlign: "center",
    fontWeight: "300",
    color: '#ff6461',
    fontSize: 12,
    marginBottom: 2
  },
  menuIcon: {
    textAlign: "center",
    marginTop: 5
  },  
});

<Routes />
<View style={styles.horizontalMenu}>
  <TouchableHighlight
  onPress={()=>Routes.navigate('Ranking')}
  style={styles.menuItem}>
    <View>
      <MaterialIcons style={styles.menuIcon} name='format-list-numbered' size={30} color='#ff6461' />
      <Text style={styles.menuText}>Ranking</Text>
    </View>
  </TouchableHighlight>
  <TouchableHighlight 
    onPress={()=>Routes.navigate('Home')}
    style={styles.menuItem}>
    <View>
      <MaterialIcons style={styles.menuIcon} name='home' size={30} color='#ff6461' />
      <Text style={styles.menuText}>Home</Text>
    </View>
  </TouchableHighlight>
  <TouchableHighlight 
    onPress={()=>Routes.navigate('Main')}
    style={styles.menuItem}>
    <View>
      <MaterialIcons style={styles.menuIcon} name='map' size={30} color='#ff6461' />
      <Text style={styles.menuText}>Mapa</Text>
    </View>
  </TouchableHighlight>
</View>
*/