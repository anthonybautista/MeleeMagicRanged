import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Button } from '../components/index';
import Outcome from '../components/Outcome';

export default function AttackScreen({ route, navigation }) {
  const { stats, userId } = route.params;
  const [results, setResults] = useState(false);
  const [attack, setAttack] = useState(1);
  const [defense, setDefense] = useState(stats.defense);
  const [outcome, setOutcome] = useState(null)

  const getUserImage = () => {
    let character = stats.character;
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

  const isSelectedAttack = (a) => {
    if (attack === a) {
      return 2;
    } else {
      return 0;
    }
  }

  const isSelectedDefense = (d) => {
    if (defense === d) {
      return 2;
    } else {
      return 0;
    }
  }

  const submitAttack = async () => {
    setResults(true);
    await fetch(`https://mmr-api.anthonybautist2.repl.co/api/attack/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          attack: attack,
          defense: defense
      }),
    }).then(result => result.json()).then(rj =>{
      setOutcome(<Outcome attack={rj["attack"]} defense={rj["defense"]} outcomeText={rj["outcome"]}></Outcome>)
    });
  }

  return (
    <View style={styles.main}>
      <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
        <StatusBar style='dark-content' />
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles['4col']}>
              {getUserImage()}  
            </View>
          </View>
          { !results?
              <View>
                <View style={styles.row4}>
                  <View>
                    <Text style={styles.subtitle}>Select Attack</Text>
                  </View>
                  <View style={styles['1col']}>
                    <Pressable onPress={() => setAttack(1)}>
                      <Image source={require('../assets/SWORD.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedAttack(1)
                        }}
                        />
                    </Pressable>
                  </View>
                  <View style={styles['1col']}>
                  <Pressable onPress={() => setAttack(2)}>
                      <Image source={require('../assets/SPELLBOOK.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedAttack(2)
                        }}
                        />
                    </Pressable>
                  </View>
                  <View style={styles['1col']}>
                  <Pressable onPress={() => setAttack(3)}>
                      <Image source={require('../assets/BOW.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedAttack(3)
                        }}
                        />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.row4}>
                  <View>
                    <Text style={styles.subtitle}>Select Defense</Text>
                  </View>
                  <View style={styles['1col']}>
                    <Pressable onPress={() => setDefense(1)}>
                      <Image source={require('../assets/SWORD.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedDefense(1)
                        }}
                        />
                    </Pressable>
                  </View>
                  <View style={styles['1col']}>
                  <Pressable onPress={() => setDefense(2)}>
                      <Image source={require('../assets/SPELLBOOK.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedDefense(2)
                        }}
                        />
                    </Pressable>
                  </View>
                  <View style={styles['1col']}>
                  <Pressable onPress={() => setDefense(3)}>
                      <Image source={require('../assets/BOW.png')} style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          borderColor: 'black',
                          borderWidth: isSelectedDefense(3)
                        }}
                        />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Button
                    onPress={() => submitAttack()}
                    backgroundColor='#2E7D32'
                    title='Attack'
                    tileColor='#fff'
                    titleSize={20}
                    containerStyle={{
                      marginBottom: 24
                    }}
                  />
                </View>
              </View>
            :
              <View>
                {
                  !outcome ?
                    <View style={styles.row}>
                      <Text style={styles.title}>Awaiting Results!</Text>
                    </View>
                  :
                    <View style={styles.row}>
                      {outcome}
                    </View>
                }
                
                <Button  onPress={() => navigation.goBack(null)}
                  backgroundColor='#2E7D32'
                  title='Home'
                  tileColor='#fff'
                  titleSize={20}
                  containerStyle={{
                    marginBottom: 24
                  }}
                />
                
              </View>   
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
    paddingTop: 10,
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
  row4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7BC',
    width: '100%',
    height: 125,
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 10,
    marginBottom: 10,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    paddingTop: 0,
    paddingLeft: 10,
    width: 75,
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