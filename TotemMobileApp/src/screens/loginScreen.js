import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View } from 'react-native';
import { login } from '../services/userService';

import {Headline, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendCred = async (props) => {
      login(email, password)
      .then(res => res.json())
      .then(async res => {
        try {
          console.log('res : ' + res.token);
          await AsyncStorage.setItem('token', res.token);
          await AsyncStorage.setItem('id', res.id.toString());
          props.navigation.replace('home');
        } catch (e) {
          console.log('error hai', e);
          Alert(e);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <Text>
        <Headline style={{alignItems: 'center'}}></Headline>;
      </Text>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            mode="flat"
            label="email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="enter your email"
          />
        </View>
        <View style={{marginTop: 15, marginBottom: 15}}>
          <TextInput
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>
        <View>
          <Button
            mode="contained"
            style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
            onPress={() => sendCred(props)}>
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    padding: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
});
export default LoginScreen;