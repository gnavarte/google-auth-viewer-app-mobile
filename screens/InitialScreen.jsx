import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Button from '../components/Button';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '192.168.164.1:3000',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

WebBrowser.maybeCompleteAuthSession();

const InitialScreen = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setIsLogged(false);
      setUserData(null);
    }).catch((error) => {
      console.log(error);
    });
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '485542750631-36e19hqr71j93tps8n1npd9s2b42egao.apps.googleusercontent.com',
  });
    
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserData(user);
          setIsLogged(true);
        }
      });
    }
  }, [response]);

  const sendData = () => {
    axiosInstance.post('/sendData', user).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      {!isLogged ? (
      <View>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>The Movie App</Text>
        <Button onPress={() => promptAsync()} title="Login with Google" />
      </View>
      ) : (
        <ScrollView style={styles.loggedContainer}>
          <Text>Logged in</Text>
          <Image source={{ uri: userData?.photoURL }} style={{ width: 100, height: 100 }} />
          <Text>{JSON.stringify(userData)}</Text>
          <Button onPress={() => handleSignOut()} title="Sign Out" />
          <Button onPress={() => sendData()} title="Send Data" />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  loggedContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default InitialScreen;