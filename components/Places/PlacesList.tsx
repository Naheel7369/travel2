import {FC} from 'react';
import {IPlaceList} from '../../interface';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from './PlaceItem';
import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const PlaceList: FC<IPlaceList> = ({places}) => {

  const navigation= useNavigation();
   function selectPlaceHandler(id: any) {
    navigation.navigate('placeDetails',{
      placeId: id
    });
   }
    
    if(!places || places.length===0){
        return <View style={styles.fallbackContainer}>
            <Text style={styles.fallbacktext}>No Places added yet add some places </Text>
        </View>
    }
  return (
    <FlatList
    style={styles.list}
      data={places}
      keyExtractor={item => item.id}
      renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
    />
  );
};
export default PlaceList;

const styles=StyleSheet.create({
  list:{
margin:24,
  },
fallbackContainer:{
flex:1,
justifyContent:'center',
alignItems:'center'
},
fallbacktext:{
fontSize:16,
color:Colors.primary200
},


});
