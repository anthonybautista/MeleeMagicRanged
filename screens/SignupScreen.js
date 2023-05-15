import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import { appAuth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

const auth = appAuth;

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '') {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
        <StatusBar style='dark-content' />
        <View style={styles.container}>
          <InputField
            inputStyle={{
              fontSize: 14
            }}
            containerStyle={{
              backgroundColor: '#fff',
              marginBottom: 20
            }}
            leftIcon='email'
            placeholder='Enter email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus={true}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <InputField
            inputStyle={{
              fontSize: 14
            }}
            containerStyle={{
              backgroundColor: '#fff',
              marginBottom: 20
            }}
            leftIcon='lock'
            placeholder='Enter password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType='password'
            rightIcon={rightIcon}
            value={password}
            onChangeText={text => setPassword(text)}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
          <Button
            onPress={onHandleSignup}
            backgroundColor='#2E7D32'
            title='Signup'
            tileColor='#fff'
            titleSize={20}
            containerStyle={{
              marginBottom: 24
            }}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            backgroundColor='#FF6666'
            title='Login'
            tileColor='#fff'
            titleSize={20}
            containerStyle={{
              marginBottom: 24
            }}
          />
        </View>
      </ImageBackground>  
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green',
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%'
  },
  image: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
});