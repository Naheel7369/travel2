import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
} from 'react-native';
import OutlineButton from '../UI/OutlineButton';
import {Colors} from '../constants/colors';
import Geolocation from '@react-native-community/geolocation';
import {getAddress, getMapPreview} from '../../Util/location';
import {useNavigation, useRoute} from '@react-navigation/native';
import MapView from 'react-native-maps';
import {useIsFocused} from '@react-navigation/native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app needs access to your location to show your current position.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

function LocationPicker({onPickLocation}:any) {
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedlat,
        lng: route.params.pickedlng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng,
        );
        console.log('addrfesss' , address);
        
        onPickLocation({...pickedLocation, address: address});
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function getLocationHandler() {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied!',
        'You need to grant location permissions to use this feature.',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPickedLocation({
          lat: latitude,
          lng: longitude,
        });
        console.log(latitude, longitude);
      },
      error => {
        Alert.alert(
          'Could not fetch location!',
          'Please try again later or pick a location on the map.',
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No Location Picked Yet</Text>;
  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.image}
        initialRegion={{
          latitude: pickedLocation?.lat,
          longitude: pickedLocation?.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.action}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutlineButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 180,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius:4,
  },
});
