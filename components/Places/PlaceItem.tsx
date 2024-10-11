import { FC } from "react";
import { IPlaceItem } from "../../interface";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";


const PlaceItem :FC <IPlaceItem> =({place,onSelect})=> {

   console.log('this is a place item', place)
   console.log('image',place.imageUri)
return (
    <Pressable style={({pressed})=>[styles.item,pressed && styles.pressed]} onPress={onSelect.bind(this, place.id)}>
        <View style={styles.item}>
        <Image style={styles.image} source={{uri:place.imageUri}}/>
        <View style={styles.info}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
        </View>
        </View>
        </Pressable>
);

}
export default PlaceItem;

const styles=StyleSheet.create({
item:{
    flexDirection:"row",
    alignItems:"flex-start",
    borderRadius:6,
    marginVertical:12,
    backgroundColor:Colors.primary500,
    elevation:2,
},
pressed:{
    opacity:0.9,
},
image:{
//    backgroundColor:'red',
   width:100,
    height:100,
    borderBottomLeftRadius:4,
    borderTopLeftRadius:4,
},
info:{
    flex:2,
    padding:12,

},
title:{
fontWeight:"bold",
fontSize:18,
color:Colors.gray700
},

address:{
    fontSize:12,
    color:Colors.gray700
},
});