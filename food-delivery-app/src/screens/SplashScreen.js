import React, {useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground } from 'react-native';
import { Colors, Images, Fonts } from '../contants';
import { Display } from '../utils';
// import * as SplashScreen1 from 'expo-splash-screen';
// import AppLoading from 'expo-app-loading';
// import { useFonts, Rancho_400Regular } from '@expo-google-fonts/rancho';
import { useFonts } from 'expo-font';


const SplashScreen = ({ navigation }) => {

  // const [loaded] = useFonts({// function for expo-font 
  //   RobotoBlack: Fonts FONTS.Roboto-Black.ttf,
  //   RobotoBold: FONTS.Roboto-Bold.ttf,
  //   RobotoRegular:FONTS.RobotoRegular.ttf,
  // });
  // if (!loaded) {
  //   return null;
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Welcome');
  //   }, 2000);
  // }, [])

  // let [fontsLoaded, error] = useFonts({
  //   Rancho_400Regular,
  // });

  
  // useEffect(async () => {
  //   async function prepare(){
  //         await SplashScreen1.preventAutoHideAsync();
  //       }
  //       prepare();
  // }, []);

  // if (!fontsLoaded) {
  //   return undefined;
  // }else{
  //   SplashScreen1.hideAsync();
  // }

  return (
    <>
      <ImageBackground style={{ flex: 1 }} source={require("../assets/images/bg1.png")}   >
        <View style={styles.container}>
          {/* <StatusBar 
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      /> */}
          <Image source={Images.LOGO} resizeMode="contain" style={styles.image} />
          <Text style={styles.titleText}>Make It Meal</Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.DARK_TWO,
  },

  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(45),
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 32,
    // fontFamily: Fonts.POPPINS_LIGHT,
  },
});

export default SplashScreen;
