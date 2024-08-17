import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  //
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // console.log('email:', email, 'password:', password)
      const isUserLogin = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setMessage(''); // yaha ya error message is leyee likha hay takay jasaiy hi user correct email and password enter kry to error message na show ho.
      console.log(isUserLogin);

      // navigation: may object ki form may wo data pass kya hay jo hum aik screen say dorsari screen pr bhejana chahaty hay.
      // 'isUserLogin': wo hay jis may login or password jo backend say (firebase say ayee hay save ho gayee hay)
      navigation.navigate('Home', {
        email: isUserLogin.user.email, 
        uid: isUserLogin.user.uid,
      });
    } catch (err) {
      console.log(err);

      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleLogin()}>
          <Text style={{color: '#fff'}}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{message}</Text>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={{color: 'blue'}}>New User Signup ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  signup: {
    alignItems: 'center',
  },
  text: {
    color: 'red',
    margin: 15,
  }
});
