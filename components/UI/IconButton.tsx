import { FC } from "react";
import { Pressable, StyleSheet } from "react-native"
import Ionioncs  from "react-native-vector-icons/Ionicons";
import { IC } from "../../interface";
import Icon from "react-native-vector-icons/Ionicons";


const  IconButton:FC<IC>=({icon,size,color,onpress})=>{
return  <Pressable style={(pressed)=>[styles.button && styles.pressed]}onPress={onpress}>
<Ionioncs name={icon} size={size} color={color} />
</Pressable>
}

export default IconButton

const styles=StyleSheet.create({
button:{
    padding:8,
    margin:4,
    justifyContent:"center",
    alignItems:"center",
},
pressed:{
opacity:0.7,
},

});