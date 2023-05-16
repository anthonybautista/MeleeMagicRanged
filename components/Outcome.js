import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

const Outcome = ({
  attack,
  defense,
  outcomeText
}) => {

  const getItemImage = (item) => {
    if (item === 1) {
      return <Image source={require('../assets/SWORD.png')} style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderColor: 'black',
      }}
      />
    } else if (item === 2) {
      return <Image source={require('../assets/SPELLBOOK.png')} style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderColor: 'black',
      }}
      />
    } else {
      return <Image source={require('../assets/BOW.png')} style={{
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderColor: 'black',
      }}
      />
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row4}>
        <View style={styles['2col']}>
          <Text style={styles.subtitle}>Your Attack</Text>
        </View>
        <View style={styles['2col']}>
          <Text style={styles.subtitle}>Opp. Defense</Text>
        </View>
      </View>
      <View style={styles.row4}>
        <View style={styles['2col']}>
            {getItemImage(attack)}
        </View>
        <View style={styles['2col']}>
            {getItemImage(defense)}
        </View>
      </View>
      <View style={styles.row4}>
        <View style={styles['4col']}>
          <Text style={styles.title}>{outcomeText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  row4: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7BC',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
  },
  "2col":  {
    flex:  2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  "4col":  {
    flex:  4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});

export default Outcome;