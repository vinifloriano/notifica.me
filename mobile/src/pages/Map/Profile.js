import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({navigation}) {
    const username = navigation.getParam('username')
    return <WebView style={{flex: 1}} source={{ uri: `https://github.com/${username}`}} />
}

export default Profile;