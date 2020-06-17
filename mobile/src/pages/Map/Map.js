import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import MapPoint from '../../components/MapPoint';
import api from '../../services/api';

function Main( { navigation } ) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [users, setUsers] = useState([]);
    const [techs, setTechs] = useState('');

    useEffect(()=>{
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                });
            }
        }
        loadInitialPosition();
    }, []);

    if(!currentRegion) {
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator style={{flex: 1}} size="large" color="#ff6461" />
            </View>
        )
    }

    async function loadUsers() {
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                tech: techs
            }
        });
        setUsers(response.data.users);
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }


    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map} >
                {users.map(user => (
                    <MapPoint key={user._id} user={user} navigation={navigation}/>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder='Pesquise um local ou categoria...'
                        placeholderTextColor='#999'
                        autoCapitalize='words'
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />
                    <TouchableHighlight underlayColor='#ff6461' onPress={loadUsers} style={styles.loadButton} >
                        <MaterialIcons name='search' size={20} color='#ff6461' />
                    </TouchableHighlight>
            </View>

            
        </>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        flex:1,
    },
    userTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: "absolute",
        top: 10,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 5,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 4,
    },
    loadButton: {
        width: 40,
        height: 40,
        marginLeft: -7,
        backgroundColor: '#FFF',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 5,
    }
});

export default Main;
