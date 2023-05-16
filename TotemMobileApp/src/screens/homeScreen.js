import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {ActivityIndicator, Text, FlatList, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGamesByUser } from '../services/gameService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const HomeScreen = () => {
  const [games, setGames] = useState([]);
  const Boiler = async () => {
    const userId = await AsyncStorage.getItem('id');
    getGamesByUser(userId)
      .then(res => res.json())
      .then(res => {
        setGames(res);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  const logout = props => {
    AsyncStorage.removeItem('token').then(() => {
      AsyncStorage.removeItem('email').then(() => {
        AsyncStorage.removeItem('password').then(() => {
          props.navigation.replace('login');
        });
      });
    });
  };

  return (
    <>
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
      </View>
    </>
  );
};

export default HomeScreen;