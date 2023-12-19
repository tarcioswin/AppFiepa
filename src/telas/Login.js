import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard, Alert, ImageBackground, Image, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import COLORS from '../../components/colors';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, FacebookAuthProvider, signOut } from 'firebase/auth';
import topo from '../../assets/LogoFipa.png';
import backgroundImage from '../../assets/FIEPAImage.jpg';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { auth, db } from '../../src/services/firebaseConfig';

const window = Dimensions.get('window');

const Login = () => {
  const [offset] = useState(new Animated.ValueXY({ x: window.width / 1.1, y: 210 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: window.width / 1.1, y: 210 }));

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 400,
        bounciness: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 165,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: window.width / 1.2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 200,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const handleLogin = () => {
    setIsModalVisible(true);
    setIsLoggingIn(true); // Disable the button as login starts
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserId(user.uid);
        setEmail('');
        setPassword('');
        setIsLoggingIn(false)
        setIsModalVisible(false);
        navigation.navigate("acesso");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let customErrorMessage = "Invalid email or password";
        if (errorCode === "auth/invalid-email") {
          customErrorMessage = "Invalid email format";
        } else if (errorCode === "auth/wrong-password") {
          customErrorMessage = "Incorrect password";
        }
        Alert.alert("Login Error", customErrorMessage, [{ text: "OK", onPress: () => setIsLoggingIn(false) }]);
        setIsModalVisible(false);
      });
  };


  const handleGoogleSignIn = async () => {
    setIsModalVisible(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      setIsModalVisible(false);
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      setIsModalVisible(true);
      const userCredential = await signInWithCredential(auth, googleCredential);

      // User is signed in, now save their data to Firestore
      const user = userCredential.user;
      await setDoc(doc(db, "usuario", user.uid), {
        name: user.displayName,
        email: user.email,
      });

      // Navigate to the desired screen after successful login
      setIsModalVisible(false);
      navigation.navigate('acesso');
     

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login Cancelled', 'Google sign-in was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login In Progress', 'Google sign-in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Error', 'Google Play services are not available.');
      } else {
        Alert.alert('Login Error', 'An error occurred during Google sign-in.');
        console.error(error);
      }
      setIsModalVisible(false);
    }
  };



  const handleFacebookSignIn = async () => {
    setIsModalVisible(true);
    try {
      LoginManager.logOut();
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        setIsModalVisible(false);
        console.log('User cancelled the Facebook login process');
        Alert.alert('Login Cancelled', 'You cancelled the Facebook login process.');
        return;
      }
  
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      setIsModalVisible(false);
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      setIsModalVisible(true);
      try {
        const userCredential = await signInWithCredential(auth, facebookCredential);
        const user = userCredential.user;
  
        await setDoc(doc(db, "usuario", user.uid), {
          name: user.displayName,
          email: user.email,
        });
  
        setIsModalVisible(false);
        navigation.navigate('acesso');

      } catch (innerError) {
        if (innerError.code === 'auth/account-exists-with-different-credential' || innerError.code === 'auth/email-already-in-use')
        {
          //Alert.alert('Erro de Login', 'Email já cadastrado');
          setIsModalVisible(false);
          navigation.navigate('acesso');
        } else {
          throw innerError;
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    }
    setIsModalVisible(false);
  };



  const imageStyle = {
    width: logo.x,  // Assuming logo.x and logo.y are your animated values
    height: logo.y,
    borderRadius: 20,  // Adjust for rounded corners
    borderWidth: 2,   // Border width
    borderColor: '#006400',  // Border color
  };

  const imageViewStyle = {
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 3.84,  // Shadow radius
    elevation: 25,  // Elevation for Android
    borderRadius: 50, // Match the Image's borderRadius
  };


  return (





    <ImageBackground source={backgroundImage} style={styles.backgroundstyle}>
      <KeyboardAvoidingView style={styles.background}>

        <View style={styles.containerLogo}>

          <View style={imageViewStyle}>
            <Animated.Image
              style={imageStyle}
              source={topo}
            />
          </View>

        </View>

        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacity,
              transform: [
                { translateY: offset.y.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }) },
              ],
            },
          ]}
        >



          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ActivityIndicator size="large" color='#006400' />
                <Text>Loading...</Text>
              </View>
            </View>
          </Modal>

          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
          />
          <View style={{ position: "relative", width: "100%", alignItems: "center" }}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry={!isPasswordShown}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 30,
                top: "40%",
                transform: [{ translateY: -12 }],
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btnSubmit} disabled={isLoggingIn} onPress={handleLogin}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} disabled={isLoggingIn} onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.registerText}>Criar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnForgot} disabled={isLoggingIn} onPress={() => navigation.navigate("forgot")}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>


          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
            <View style={{ flex: 1, height: 3, backgroundColor: COLORS.black }} />
            <Text style={{ paddingHorizontal: 10, fontSize: 20, color: COLORS.black, fontWeight: 'bold' }}>ou</Text>
            <View style={{ flex: 1, height: 3, backgroundColor: COLORS.black }} />
          </View>


          <View style={styles.socialMediaButtonsContainer}>
            <TouchableOpacity style={styles.socialMediaButton} onPress={handleFacebookSignIn}>
              <Image source={require('../../assets/facebook.png')} style={{
                height: 36, width: 36, marginRight: 8, borderColor: '#ddd',
                shadowColor: '#000'
              }} resizeMode="contain" />
              <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialMediaButton} onPress={handleGoogleSignIn}>
              <Image source={require('../../assets/google.png')} style={{
                height: 36, width: 36, marginRight: 8, borderColor: '#ddd',
                shadowColor: '#000'
              }} resizeMode="contain" />
              <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Google</Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  socialMediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    borderColor: '#006400',  // Border color
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 3.84,  // Shadow radius
    elevation: 15,  // Elevation for Android
  },
  socialMediaButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: '#006400',  // Border color
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 3.84,  // Shadow radius
    elevation: 15,  // Elevation for Android
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  backgroundstyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 100,
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#006400',  // Border color
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 3.84,  // Shadow radius
    elevation: 15,  // Elevation for Android
  },
  btnSubmit: {
    borderColor: '#006400',  // Border color
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.25,  // Shadow opacity
    shadowRadius: 3.84,  // Shadow radius
    elevation: 15,  // Elevation for Android
    backgroundColor: '#006400',
    width: '95%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnRegister: {
    marginTop: 10,
    color: 'black',
  },
  registerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  forgotText: {
    marginTop: 10,
    fontSize: 18,
    color: 'yellow',
    fontWeight: 'bold',
  },
});

export default Login;
