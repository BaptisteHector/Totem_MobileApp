import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import LoadingScreen from './src/screens/loadingScreen';
import LoginScreen from './src/screens/loginScreen';
import HomeScreen from './src/screens/homeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pushNotificationToken } from './src/services/userService'
import * as Notifications from 'expo-notifications';


const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true
  }),
});

const App = ({navigation}) => {
  const [isloggedin, setLogged] = useState(null);

  const responseListener = useRef();
  const notificationListener = useRef();

  const registerNotificationsToken = async () => {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  
    return token;
  }

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin().then(() => {
      registerNotificationsToken().then((token) => {
        AsyncStorage.setItem('notificationToken', token);
        pushNotificationToken(token);
      });
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('--- notification received ---');
      console.log(notification);
      console.log('------');
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('--- notification tapped ---');
      console.log(response);
      console.log('------');
    });
    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (
    <PaperProvider>
      {/* <LoadingScreen /> */}
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="loading" component={LoadingScreen} />
          <Stack.Screen name="login" component={LoginScreen} />

          <Stack.Screen name="home" component={HomeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default App;