import {FC, useCallback, useLayoutEffect, useState} from 'react';
import {IMap} from '../../interface';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import IconButton from '../../components/UI/IconButton';

const Map: FC<IMap> = ({navigation, route}) => {

  const initialLocation = route.params && {
    lat: route.params.initiallat,
    lng: route.params.initiallng,
  };
  const [selectLocation, setselectLocation] = useState(initialLocation);

 

  const region = {
    latitude:initialLocation ? initialLocation.lat :24.8607,
    longitude:initialLocation ? initialLocation.lng : 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationhandler(event) {
    if(initialLocation){
      return;
    }
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setselectLocation({lat: lat, lng: lng});
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      Alert.alert(
        'No Location Picked!',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }
    navigation.navigate('AddPlace', {
      pickedlat: selectLocation.lat,
      pickedlng: selectLocation.lng,
    });
  }, [navigation, selectLocation]);
  useLayoutEffect(() => {
    if(initialLocation){
      return;
    }
    navigation.setOptions({
      headerRight: ({tintColor}: any) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onpress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler,initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationhandler}>
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation.lat,
            longitude: selectLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
