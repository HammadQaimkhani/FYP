import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { SearchBar } from 'react-native-elements';
import { Colors, Mock } from '../contants';
import { Button } from '../components';

import AppLoading from 'expo-app-loading';
import { useFonts, Rancho_400Regular } from '@expo-google-fonts/rancho';
// import { useFonts } from 'expo-font';

import recipes from '../../RecipeDataset/RecipeDS1';

const SPACING = 10;
const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 30;
// SplashScreen.preventAutoHideAsync();

export default function RecipeListScreen({ navigation, route: { params: { pr }, }, }) {
  const [input, setInput] = useState('')
  // const [fontsLoaded] = useFonts(null);

  // -----------------------------------------------------------------------

  useEffect(() => {
    setInput(pr)
  }, [pr]);

  let [fontsLoaded, error] = useFonts({
    Rancho_400Regular,
  });

  if (!fontsLoaded) {
    <AppLoading />
  }

  const [recipeList1, setRecipeList1] = useState(recipes)
  const [recipeList, setRecipeList] = useState(recipes)

  const show = (x) => {
    let recipeListS = []
    let foodItem = []
    let isFound = false;

    // alert(input)

    if (input.length > 0) {
      const lInput = input.toLowerCase()
      foodItem = lInput.split(' ')

      recipes.map((item) => {
        item.Ingredients.filter(name => {
          foodItem.map(fitem => {
            if (name.includes(fitem)) isFound = true
          })
        })

        if (isFound) {
          recipeListS.push(item)
          isFound = false;
        }
      })

      setRecipeList(recipeListS)
    }
  }


  return (
    <>


      <SafeAreaView style={{ flex: 1, marginTop: 50 }} >
        <View >
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.orange}
            translucent
          />
          <Text style={{ fontSize: 22, fontWeight: "700", textAlign: "center" }}>
            What would you like to Search?
          </Text>
        </View>
        {/* <View style={{flex:2, flexDirection: 'row', alignContent:'stretch'}} > */}
        <View>
          <SearchBar onBlur={show} onChangeText={(x) => { setInput(x) }} value={input} placeholder="Type Here..." />
          <Button title="Take a picture" icon="camera" onPress={() => { navigation.navigate("TakePicture", { img: null }) }} color={Colors.DEFAULT_BLACK} />
        </View>
        <FlatList data={recipeList} numColumns={2}
          renderItem={({ item }) =>

            <TouchableOpacity style={{ width: '45%', margin: 10 }} key={item.FIELD1} onPress={() => { navigation.navigate('Recipe', { selRecipe: item }) }}>

              <Image style={styles.imgItem} source={item.Image_Name} />
              <Text style={styles.titleItem} > {item.Title} </Text>
              <Text style={styles.txt1Item}> Cooking Preparation {item.time}    </Text>
              <Text style={styles.txt3Item}> Cooking Time {item.cooking_time} </Text>

            </TouchableOpacity>
          }
        />


      </SafeAreaView>

    </>
  )
}

const styles = StyleSheet.create({
  imgItem: {
    width: "100%",
    height: ITEM_WIDTH + 25,
    borderRadius: 20,
  },
  titleItem: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
    // fontFamily: 'Rancho_400Regular',
  },
  txt1Item: {
    fontSize: 12,
    color: Colors.gray,
    marginVertical: 10,
  },
  txt3Item:
  {
    fontSize: 10,
    fontWeight: "700"
  }
})