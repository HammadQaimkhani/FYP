import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Colors, Images, Fonts } from '../contants';
import { Display } from '../utils';




export default function MainHomeScreen( { navigation }) {
    return (
        <>

            <ImageBackground style={{ flex: 1 }} source={Images.MAINBG}   >
            <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.orange}
        translucent
      />
                <View style={styles.container1} />
                <View style={styles.container2} >
                    <View>
                        <Text style={styles.text1} > Let your favorite food find you </Text>
                        <Text style={styles.text2}> Dolore reprehenderit id ea eu voluptate deserunt occaecat occaecat.  </Text>
                        <TouchableOpacity style={styles.touchBtn} onPress={() => { navigation.navigate('HomeTabs') }}>
                            <Text style={styles.touchTxt}> Want to Shop </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchBtn} 
                        onPress={() => { navigation.navigate('RecipeList', { pr: null }) }}
                        >
                            <Text style={styles.touchTxt}> Search Recipies </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>

        </>
    )
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        // backgroundColor: Colors.black,
        // opacity: 0.5
    },
    
    container2: {
        position: "absolute",
        height: "75%",
        zIndex: 2,
        width: "95%",
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
        paddingBottom: 50,
    },
    text1: {
        color: Colors.dark,
        textAlign:'center',
        fontWeight: "800",
        fontSize: 25,
        textTransform: "capitalize",
    },
    text2: {
        color: Colors.gray,
        fontWeight: "600",
        fontSize: 15,
    },
    touchBtn: {
        padding: 12,
        backgroundColor: Colors.orange,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 20,
        
    },
    touchTxt: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 20,
        fontWeight: "600",
        textTransform: "capitalize",
    }
})