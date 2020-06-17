import React, { useState } from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet, StatusBar} from 'react-native';
import Constants from 'expo-constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome5 } from '@expo/vector-icons';

function Register({navigation}) {
    const [name, setName] = useState('');
    const [interest, setInterest] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        navigation.navigate('TabNavigation');
    }

    function login() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>notifica.me</Text>
            <View>
                <TextInput 
                    style={styles.input}
                    placeholder='Nome'
                    placeholderTextColor='#666'
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='#666'
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Senha'
                    placeholderTextColor='#666'
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Interesses'
                    placeholderTextColor='#666'
                    autoCorrect={false}
                    value={interest}
                    onChangeText={setInterest}
                />
            </View>
            <TouchableHighlight underlayColor='#fff' style={styles.btnLogin} onPress={handleSubmit}>
                <Text style={styles.btnLoginText}>Cadastrar</Text>
            </TouchableHighlight>
            <View style={styles.split}/>
            <View style={styles.register}>
                <Text style={styles.registerText}>Já tem uma conta? </Text>
                <Text style={styles.registerText2} onPress={login}>Entre</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: Constants.statusBarHeight,
        borderTopColor: "#ff6461",
        justifyContent: "center",
        flex: 1
    },
    title: {
        textAlign: "center",
        fontSize: 35,
        borderRadius: 2,
        marginBottom: 20
    },
    input: {
        borderColor: "#999", 
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 5,
        height: 40,
        fontSize: 20,
        borderRadius: 2,
        color: "#444",
        paddingLeft: 10
    },
    btnLogin: {
        backgroundColor: "#ff6461",
        justifyContent: "center",
        marginHorizontal: 15,
        marginVertical: 25,
        height: 40,
        borderRadius: 4,
        alignItems: "center"
    },
    btnLoginText: {
        fontSize: 18,
        color: "#fff",
    },
    forgotPass: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "300",
    },
    split: {
        marginVertical: 30,
        borderBottomColor: "#999",
        borderBottomWidth: 2,
        marginHorizontal: 15,
    },
    social:{
        flexDirection: "row",
        justifyContent: 'space-around',
        marginHorizontal: 50,
        marginVertical: 10
    },
    register: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25
    },
    registerText2: {
        color: "#ff6461"
    }
});


async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: 'YOUR_CLIENT_ID_HERE',
        iosClientId: '658444679471-122n0jofcfa9fq47ac8tfbr5mv0fd5qp.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        alert(result.accessToken);
      } else {
        alert("{ cancelled: true }");
      }
    } catch (e) {
        alert("{ error: true }");
    }
}

async function logIn() {
    try {
      await Facebook.initializeAsync('2659050064367006');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        alert(`Hi ${(await response.json()).name}!`);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
}





export default Register;