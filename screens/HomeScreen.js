import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [userName, changeUserName] = useState('');
  const [userPassword, changePassword] = useState('');
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      AsyncStorage.getItem('userCurrentData')
        .then(value => {
          if (value) {
            const data = JSON.parse(value);
            changeUserName(data.userName);
            changePassword(data.password);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const removeData = async () => {
    try {
      //   await AsyncStorage.removeItem('userCurrentData');
      await AsyncStorage.clear();
      navigation.goBack();
    } catch (error) {
      log.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello{' '}
        <Text style={styles.userName}>
          {userName} {userPassword}
        </Text>
      </Text>
      <TouchableOpacity
        onPress={removeData}
        style={{
          width: 100,
          height: 50,
          backgroundColor: '#a11710',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
  userName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5eba7d',
    marginBottom: 100,
  },
});
