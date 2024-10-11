import React, { useEffect, useState } from 'react';

import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './components/constants/colors';
import Map from './screens/Map';
import { init } from './Util/database';
import LoaderKit from 'react-native-loader-kit'
import PlaceDetails from './screens/placeDetails';
import placeDetails from './screens/placeDetails';


const Stack = createNativeStackNavigator();

export default function App() {


const [dbInitalized,setDBInitalized] = useState(false);
useEffect(()=>{
  init().then(()=>{
    setDBInitalized(true)
  }).catch(err=>{
   console.log(err);
  });
},[]);

// if(!dbInitalized){
//   return  <LoaderKit style={{ width: '30%', height: '30%' ,alignSelf:'center',margin:'80%',}}
//   name={'BallPulseRise'} // Optional: see list of animations below
//   color={Colors.primary500}/>
// }


  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700},
          
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title:'Your Favourite Places',
              headerRight: ({tintColor}) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onpress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title:'Add New Place'
          }} />
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="placeDetails" component={placeDetails} options={{
            title:'Loading Place...',
          }}/>

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
