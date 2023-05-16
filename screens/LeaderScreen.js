import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, FlatList } from 'react-native';
import { db } from '../firebaseConfig';
import {equalTo, onValue, orderByChild, query, ref} from "firebase/database";
import { Button } from '../components/index';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function LeaderScreen({ navigation }) {
  const [stats, setStats] = useState([]);
  
  useEffect( () => {
    const fetchData = async () => {
        return onValue(ref(db,`Users/`), (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                let sortedData = Object.entries(data).sort(
                    (p1, p2) => p2[1].wins === p1[1].wins ? p1[1].battles - p2[1].battles : p2[1].wins - p1[1].wins);
                setStats(sortedData);
            }
        });
    }
    fetchData();
  }, [setStats]);

  const getUserImage = (character) => {
    if (character === 1) {
      return <Image source={require('../assets/1.png')} style={styles.characterImage}/>
    } else if (character === 2) {
      return <Image source={require('../assets/2.png')} style={styles.characterImage}/>
    } else if (character === 3) {
      return <Image source={require('../assets/3.png')} style={styles.characterImage}/>
    } else {
    return <Image source={require('../assets/4.png')} style={styles.characterImage}/>
    }
  }

  return (
    <View style={styles.main}>
      <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
        <StatusBar style='dark-content' />
        <View style={styles.container}>
            <View style={styles.row3}>
                <Text style={styles.title2}>Top Players</Text>
            </View>
            <View style={styles.row}>
                <FlatList style={{width: '100%', flex: 4}}
                    data={stats}
                    renderItem={({item}) => 
                        <View style={styles.column}>
                            <View style={styles.row2}>
                                <View style={styles.col1}>
                                    {getUserImage(item[1].character)}
                                </View>
                                <View style={styles.col2}>
                                    <Text style={styles.title}>{item[1].email}</Text>
                                    <Text style={styles.subtitle}>
                                        Wins: {item[1].wins} Battles: {item[1].battles} 
                                    </Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
            <View>
                <Button
                    onPress={() => navigation.goBack(null)}
                    backgroundColor='#2E7D32'
                    title='Home'
                    tileColor='#fff'
                    titleSize={20}
                    containerStyle={{
                        marginBottom: 24
                    }}
                />
            </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    width: '100%'
  },
  col1: {
    flex: 1
  },
  col2: {
    flex: 2,
    width: 200
  },
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: 100,
  },
  row3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    backgroundColor: '#FFF7BC',
    borderRadius: 10,
    height: 50
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
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
  },
  title2: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'flex-start',
  },
  image: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  characterImage: {
    width: 75,
    height: 75,
    alignSelf: 'center',
  },
});