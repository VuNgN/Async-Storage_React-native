import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [userName, changeUserName] = useState('');
  const [userPassword, changePassword] = useState('');

  const data = [];
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      AsyncStorage.getItem('userCurrentData')
        .then(value => {
          if (value) navigation.navigate('Home');
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const setData = async () => {
    if (userName.length === 0 || userPassword.length === 0) {
      Alert.alert('Hey!', 'You need to enter your username and password');
    } else {
      try {
        data.push({
          userName: userName,
          password: userPassword,
        });
        await AsyncStorage.setItem(
          'userCurrentData',
          JSON.stringify(data[data.length - 1]),
        );
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.navigate('Home');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Async Storage</Text>
      <TextInput
        style={styles.input}
        onChangeText={changeUserName}
        value={userName}
        placeholder="User name"
      />
      <TextInput
        style={styles.input}
        onChangeText={changePassword}
        value={userPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => {
          setData();
          changeUserName('');
          changePassword('');
        }}
        style={{
          width: 100,
          height: 50,
          backgroundColor: '#5eba7d',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          alignSelf: 'flex-end',
          marginRight: 50,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 100,
  },
  input: {
    height: 50,
    width: 300,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20,
  },
});
