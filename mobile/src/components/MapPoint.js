import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function MapPoint({ user, navigation }) {
    return    (             
    <Marker coordinate={{ latitude: user.location.coordinates[1], longitude: user.location.coordinates[0]}}>
        <Image style={styles.avatar} source={{uri: user.avatar_url}} />
        <Callout onPress={()=>{
            // navegação
            navigation.navigate('Profile', {username: user.username});
        }}>
            <View style={styles.callout}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userBio}>{user.bio}</Text>
                <Text style={styles.userTechs}>{user.techs.join(', ')}</Text>
            </View>
        </Callout>
    </Marker>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userBio: {
        color: '#666',
        marginTop: 5
    },
});

export default MapPoint;