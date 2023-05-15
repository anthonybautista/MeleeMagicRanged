import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { IconButton } from '../components';
import { appAuth, db } from '../firebaseConfig';
import {equalTo, onValue, orderByChild, query, ref} from "firebase/database";
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { Button } from '../components/index';

const auth = appAuth;

export default function LeaderScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [stats, setStats] = useState(null);
  
  useEffect( () => {
    const fetchData = async () => {
        const dbRef = ref(db,`Users/`)
        const q = query(dbRef, ...[orderByChild("email"), equalTo(user.email)]);

        return onValue(q, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                setStats(data);
            }
        });
    }
    fetchData();
  }, [setStats]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserImage = () => {
    const character = Object.values(stats)[0].character;

    if (character === 1) {
      return <Image source={require('../assets/1.png')} style={styles.characterImageFull}/>
    } else if (character === 2) {
      return <Image source={require('../assets/2.png')} style={styles.characterImageFull}/>
    } else if (character === 3) {
      return <Image source={require('../assets/3.png')} style={styles.characterImageFull}/>
    } else {
    return <Image source={require('../assets/4.png')} style={styles.characterImageFull}/>
    }
  }

  const selectCharacterOne = () => {
    fetch(`https://mmr-api.anthonybautist2.repl.co/api/set-character/${user.uid}/1`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: user.email
      }),
    });
  }

  const selectCharacterTwo = () => {
    fetch(`https://mmr-api.anthonybautist2.repl.co/api/set-character/${user.uid}/2`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: user.email
      }),
    });
  }

  const selectCharacterThree = () => {
    fetch(`https://mmr-api.anthonybautist2.repl.co/api/set-character/${user.uid}/3`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: user.email
      }),
    });
  }

  const selectCharacterFour = () => {
    fetch(`https://mmr-api.anthonybautist2.repl.co/api/set-character/${user.uid}/4`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email: user.email
      }),
    });
  }

  return (
    <View style={styles.main}>
      <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
        <StatusBar style='dark-content' />
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles['3col']}>
              <Text style={styles.title}>Welcome {user.email}!</Text>
              <Text style={styles.subtitle}>Your UID is: {user.uid} </Text>
            </View>
            <View style={styles.logoutButton}>
              <IconButton
                name='logout'
                size={24}
                color='red'
                onPress={handleSignOut}
              />
            </View>  
          </View>
          <View style={styles.row}>
            <View style={styles['4col']}>
              {
                stats ?
                  <View>
                    <View style={styles.row3}>
                      <View style={styles['4col']}>
                        {getUserImage()}
                      </View>
                    </View>
                  </View>
                :
                  <View>
                    <View style={styles.row2}>
                      <View style={styles['2col']}>
                        <Pressable onPress={selectCharacterOne}>
                          <Image source={require('../assets/1.png')} style={styles.characterImage}/>
                        </Pressable>
                      </View>
                      <View style={styles['2col']}>
                        <Pressable onPress={selectCharacterTwo}>
                          <Image source={require('../assets/2.png')} style={styles.characterImage}/>
                        </Pressable>
                      </View>
                    </View>
                    <View style={styles.row2}>
                      <View style={styles['2col']}>
                        <Pressable onPress={selectCharacterThree}>
                          <Image source={require('../assets/3.png')} style={styles.characterImage}/>
                        </Pressable>
                      </View>
                      <View style={styles['2col']}>
                        <Pressable onPress={selectCharacterFour}>
                          <Image source={require('../assets/4.png')} style={styles.characterImage}/>
                        </Pressable>
                      </View>
                    </View>
                  </View>
              }   
              {
                stats ?
                  <View>
                    <Text style={styles.centered}>Your Character</Text>
                    <Text style={styles.centered}>Battles: {Object.values(stats)[0].battles}</Text>
                    <Text style={styles.centered}>Wins: {Object.values(stats)[0].wins}</Text>
                  </View>
                :
                  <Text style={styles.centered}>Select Character!</Text>  
              }
            </View>
          </View>
          {
            stats ? 
            <View>
              <Button
                // onPress={onLogin}
                backgroundColor='#2E7D32'
                title='Attack'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                  marginBottom: 24
                }}
              />
              <Button
                // onPress={() => navigation.navigate('Signup')}
                backgroundColor='#FF6666'
                title='Leaderboard'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                  marginBottom: 24
                }}
              />
            </View>
            :
            <View></View>
          }
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#FFF7BC',
    paddingBottom: 10,
    borderRadius: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 125,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 250,
  },
  main: {
    flex: 1,
    backgroundColor: 'green',
  },
  container: {
    flex: 4,
    paddingHorizontal: 10,
    width: '100%'
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingLeft: 10
  },
  image: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  logoutButton: {
    flex:  1
  },
  "1col":  {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  "2col":  {
    flex:  2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  "3col":  {
    flex:  3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  "4col":  {
    flex:  4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterImage: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  characterImageFull: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  centered: {
    alignSelf: 'center',
    fontWeight: '600',
  }
});