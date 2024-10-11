import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../../components/UI/OutlineButton";
import { Colors } from "../../components/constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../../Util/database";



function PlaceDetails({route,navigation}) {
function showOnMapHandler() {
    navigation.navigate('Map',{
        initiallat:fetchedPlace.location.lat,
        initiallng:fetchedPlace.location.lng,
    });
}
const [fetchedPlace,setfetchedPlace] =  useState();  

const selectedPlaceId = route.params.placeId;
useEffect(()=>{
    async function loadPlaceData() {
      const place= await fetchPlaceDetails(selectedPlaceId);
      setfetchedPlace(place);
      navigation.setOptions({
        title:place.title,
      });
    }
    loadPlaceData();
},[selectedPlaceId]);

if(!fetchedPlace){
    return <View style={styles.fallback}>
        <Text>Loading Place data ....</Text>
    </View>
}
    return <ScrollView>

        <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlineButton icon='map' onPress={showOnMapHandler}>View on Map</OutlineButton>
        </View>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({

    fallback:{
     flex:1,
     justifyContent:"center",
     alignItems:"center",
    },
   
    image:{
        height:'35%',
        minHeight:300,
        width:'100%'
    },
    locationContainer:{
          justifyContent:"center",
          alignItems:"center",
    },
    addressContainer:{
           padding:20,

    },
    address:{
        color:Colors.primary500,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16,
    }
});