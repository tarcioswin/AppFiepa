import { View, Text, Image, TextInput, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import React, { useState,useEffect, useLayoutEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../components/colors';
import Button from '../../components/Button';
import backgroundImage from '../../assets/FIEPAImage.jpg'; // Replace with your image path

const Forgot = ({ navigation }) => {


  // Add a state to manage the background color
  const [backgroundColor, setBackgroundColor] = useState(COLORS.primary);
  const [boiHeaderImageWidth, setBoiHeaderImageWidth] = useState(30);
  const [boiContentImageWidth, setBoiContentImageWidth] = useState(100);

  useLayoutEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    // You can adjust the header image size here based on your preference
    const headerImageWidth = 200;
    setBoiHeaderImageWidth(headerImageWidth);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: 'black',
      headerStyle: { backgroundColor: "white" },
      headerStyle: { backgroundColor: COLORS.primary },
      headerTitleStyle: { fontWeight: 'bold' }
    });
  }, [backgroundColor]);
    

 return (



  <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1, marginHorizontal: 1 }}>
      
      

         <View style={{ marginBottom: 1 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 1,
                        fontWeight: 'bold',
                        paddingLeft: 12,
                    }}>Email</Text>
                    <View style={{
                        width: "95%",
                        alignSelf: "center", 
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        backgroundColor:'white'
                    }}>
                        <TextInput
                            placeholder='Entre com seu endereço de email cadastrado'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                            
                            }}
                        />
                    </View>
                </View>




                <Button
                    title="Enviar"
                    filled
                    borderColor='#006400'
                    style={{
                        marginTop: 10,
                        marginBottom: 4,
                        backgroundColor:'#006400',    
                        fontWeight: 'bold', 
                        width: "95%",
                        alignSelf: "center",                   
                    }}
                />



                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.black,
                            marginHorizontal: 10,
                        }}
                    />

                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black, fontWeight:'bold' }}>Um link de acesso será enviado para seu email cadastrado!</Text>
                    
                </View>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.8, // Adjust opacity here

  },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    boiImage: {
      borderRadius: 15,
      alignSelf: 'center', // Center the image horizontally
      marginVertical: 0, // Add some margin to the image
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      left: 10
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 0,
      alignSelf: 'center', // Center the text horizontally
    },
  });


export default Forgot


