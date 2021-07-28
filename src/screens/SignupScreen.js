import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Linking,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
// import auth from '../config'
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

const GitHubRepo = 'https://github.com/thesagargoyal/react-photo-share';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openGitHub = async () => {
    await Linking.openURL(GitHubRepo);
  };

  const userSignup = async () => {
    if (!email || !password || !name)
      Alert.alert('Please enter required fields!');
    else {
      console.log(name);

      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          await firebase
            .firestore()
            .collection('user')
            .add({
              name,
              uid: firebase.auth().currentUser.uid,
            })
            .catch((err) => {
              console.log(err);
              Alert.alert('Name not updated');
            });
        })
        .catch((error) => {
          Alert.alert('Something went wrong!');
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.main}>
      <View style={styles.box1}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={styles.box2}>
        <Text style={styles.text}>Please Sign Up to continue</Text>
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button mode="contained" onPress={() => userSignup()}>
          Sign Up
        </Button>
        <TouchableOpacity onPress={() => navigation.goBack('login')}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Already have a account ? Log In !
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.author}>
        <TouchableOpacity
          onPress={() => {
            openGitHub();
          }}
          style={styles.githubButton}>
          <Image
            source={require('../../assets/github.png')}
            style={styles.github}
          />
          <Text style={styles.githubText}>GitHub</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  box1: {
    alignItems: 'center',
    flex: 3,
  },
  box2: {
    paddingHorizontal: 40,
    height: '50%',
    justifyContent: 'space-evenly',
    flex: 5,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
  },
  author: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  githubButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  github: {
    height: 40,
    width: 40,
  },
  githubText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
