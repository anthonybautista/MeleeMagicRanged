import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import Firebase from '../firebaseConfig';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function Home({ navigation }) {

    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
        try {
        await auth.signOut();
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../assets/splash.png')} resizeMode="cover" style={styles.image}>
            <View style={{height: '10%', paddingTop: 20, backgroundColor: 'green'}}>
            <Text style={{fontSize: 20, color: 'white'}}>MeleeMagicRanged</Text>
            </View>
            {
                user ?
                <View>
                    <Text style={styles.title}>Welcome {user.email}!</Text>
                    <Text style={styles.text}>Your UID is: {user.uid} </Text>
                    <Button
                        title="Logout"
                        onPress={handleSignOut}
                    />
                </View>
                :
                    <View>
                        <Button
                            title="Login"
                            onPress={() => navigation.navigate('Login')}
                        />
                        <Button
                            title="Sign Up"
                            onPress={() => navigation.navigate('Signup')}
                        />
                    </View>
            }
        
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff',
  },
  image: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
});