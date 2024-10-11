import {FC, SetStateAction, useCallback, useState} from 'react';
import {IPlaceForm} from '../../interface';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import {Place} from '../models/Place';

const Placeform: FC<IPlaceForm> = ({onCreatePlace}:any) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedlocation, setpickedlocation] = useState();
  function changeTitleHandler(enteredText: SetStateAction<string>) {
    setEnteredTitle(enteredText);
  }
  function TakeImageHandler(imageUri:any) {
    setSelectedImage(imageUri);
  }

  const PickLocationHandler = useCallback((location:any) => {
     setpickedlocation(location);
  }, []);

  function savePlaceHandler() {
    // console.log('chal rha hai');
    
    // if (!enteredTitle || !selectedImage || !pickedlocation) {

    //   console.log("Please fill in all fields!");
    //   return;
    // }

    const placeData = new Place(
      enteredTitle,
      selectedImage,
      pickedlocation ,
    );

    console.log("Saving place:", placeData);
    onCreatePlace(placeData);
  }
  
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={TakeImageHandler} />
      <LocationPicker onPickLocation={PickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default Placeform;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
