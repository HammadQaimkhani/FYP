import React, { useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';
// const carImage = require('./assets/image/car.png')

export default function GMapLiveLocationScreen({
    navigation,
    route: {
      params: {lat, long},
    },
  }) {
    const [origin, setOrigin] = useState({
        latitude: 25.420053425735084,
        longitude: 68.2645880171087,
        
    });

    const [destination, setDestination] = useState({
        // latitude: 25.3646669182727,
        // longitude: 68.38076493604409,
        latitude: parseFloat(lat),
        longitude: parseFloat(long)
    });

    React.useEffect(() => {
        getLocationPermission();
    }, [])

    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setOrigin(current);
    }

    return (
        <View style={styles.container}>
            {/* {console.log(parseFloat(lat))} */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                     latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}
            >
                <Marker
                    draggable
                    coordinate={origin}
                    // image={carImage}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                />
                <Marker
                    draggable
                    coordinate={destination}
                    onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                />
                {/* <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_KEY}
              strokeColor="black"
              strokeWidth={5}
            /> */}
                <Polyline
                    coordinates={[origin, destination]}
                    strokeColor="black"
                    strokeWidth={3}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    }
});
