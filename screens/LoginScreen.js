import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components/index';
import { appAuth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const auth = appAuth;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setLoginError(error.message);
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
              marginBottom: 20,
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
          {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
          <Button
            onPress={onLogin}
            backgroundColor='#2E7D32'
            title='Login'
            tileColor='#fff'
            titleSize={20}
            containerStyle={{
              marginBottom: 24
            }}
          />
          <Button
            onPress={() => navigation.navigate('Signup')}
            backgroundColor='#FF6666'
            title='Signup'
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