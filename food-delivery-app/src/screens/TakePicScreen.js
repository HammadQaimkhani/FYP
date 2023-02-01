import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Button } from '../components';
import { Colors, Mock } from '../contants';
// import { PredictsFood } from '../services';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';
import { ApiContants } from '../contants';
import axios from 'axios';

export default function TakePicScreen({ navigation, route: { params: { img }, }, }) {

  // console.log(img)
  // var capImg = img;
  const [fileObj, setFileObj] = useState(null)
  const [imageToPredict, setImageToPredict] = useState(null)
  const [prediction, setPrediction] = useState([]);

  //=========================================
  useEffect(() => {
       setPrediction(null)
      setImageToPredict(img)  
  }, [img]);

  const pickImage = async () => {
    setPrediction(null)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1
    })
    if (result.assets != null) {
      setImageToPredict(result.assets[0])
      // console.log(result.assets[0])
    }
  }

  
  const predictImageViaUpload = async () => {

    if (!imageToPredict) {
      alert("Please Select Image First...")
    } else {
      // alert("hellooooo")

      console.log(imageToPredict)

      let localUri = imageToPredict.uri;
      let filename = localUri.split('/').pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // alert(localUri)

      let formData = new FormData();
      formData.append('file', { uri: localUri, name: filename, type });
      // formData.append('file', { imageToPredict });


      const base_url = ApiContants.BACKEND_API.BASE_API_URL + '/predict/upload';
      await axios.post(base_url, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + getToken(),
        },
      }).then(res => {
        setPrediction(res.data.results);
      }).catch(err => {
        console.log(err);
      });

    }
  }

  const navigateToList = () => {
    const pr = prediction[0].name + ' ' + prediction[1].name;
    navigation.navigate('RecipeList', { pr: pr })
    console.log(pr)
  };

  const footer = () => {
    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity style={styles.btnStyleSrch} onPress={navigateToList}>
          <Text style={styles.btnStyleSrchTxt}>Search Recipies</Text>
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}  >

      <View style={styles.welcomeContainer}>
        <Text style={styles.headerText}>Clarifai Food Detection</Text>
        <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
          <Button title={"Capture Image"} icon="camera" onPress={() => { navigation.navigate("CameraApp") }} color={Colors.DEFAULT_BLACK} />
          <Button title={"Take a picture from Gallery"} icon="image-inverted" onPress={pickImage} color={Colors.DEFAULT_BLACK} />
        </View>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={predictImageViaUpload}
        >
          <View style={{ position: "relative" }}>
            <View
              style={{
                zIndex: 0,
                elevation: 0,
              }}
            >
            {!imageToPredict ? null : <Image source={{ uri: imageToPredict.uri }} style={styles.imageContainer} />}

            </View>
          </View>

          {imageToPredict ?
            <Text style={styles.transparentText}>Tap to Show Prediction</Text>
            :
            <Text style={styles.transparentText}>ُPlease Select Image For Prediction</Text>
          }
        </TouchableOpacity>

        {!prediction ? null :
          <FlatList data={prediction.slice(0,10)}
          maxToRenderPerBatch={10}
          scrollEnabled={true}
            ListFooterComponent={prediction.length > 0 ? footer : null}
            renderItem={({ item }) =>
              <View>
                <Text style={{ fontSize: 12, fontWeight: "700" }}> {item.name} - {item.value} </Text>
              </View>
            }
          />


        }
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,

  },
  headerText: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark
  },
  text: {
    fontSize: 16,
  },
  btnStyleSrch: {
    backgroundColor: Colors.orange,
    padding: 5,
    borderRadius: 5,
  },
  btnStyleSrchTxt: {
    fontSize: 14,
    fontWeight: '600',
  },

  imageWrapper: {
    width: '80%',
    height: 270,
    borderColor: Colors.orange,
    borderWidth: 3,
    borderStyle: "dashed",
    marginTop: 15,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 270,
    height: 240,
    // overflow: true
  },
  predictionWrapper: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  transparentText: {
    opacity: 0.8,
    fontSize: 14
  },
});
