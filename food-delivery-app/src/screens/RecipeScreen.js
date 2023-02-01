import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { Colors } from '../contants';


export default function RecipeScreen({ navigation, route: { params: { selRecipe }, }, }) {
    // const route = useRoute();
    // const sRecipe = route.params.selRecipe
    return (
        <View style={{ flex: 1, marginHorizontal: 10, marginTop: 40 }}>
            <Text style={{ fontSize: 24, fontWeight: "700", margin: 8, textAlign: 'center', color: Colors.dark }}> {selRecipe.Title} </Text>
            <Image source={selRecipe.Image_Name} style={{ width: '100%', marginVertical: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: "700", textAlign: 'center' }}> Preparation Time: {selRecipe.time} </Text>
            <Text style={{ fontSize: 14, fontWeight: "700", textAlign: 'center' }}> Cooking Time: {selRecipe.cooking_time} </Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Ingredients</Text>
            <FlatList data={selRecipe.Ingredients}
                renderItem={({ item }) =>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "600" }}> - {item} </Text>
                    </View>
                }
                ListFooterComponent={
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "700", textAlign: 'center' }}>Instructions</Text>
                        <Text style={{ fontSize: 12 }}>{selRecipe.Instructions}</Text>
                    </View>
                }
            />

        </View>
    )
}