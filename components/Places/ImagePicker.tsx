import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import { Colors } from '../constants/colors';
import { PermissionsAndroid } from 'react-native';
import {
  CameraOptions,
  CameraType,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {useState} from 'react';
import OutlineButton from '../UI/OutlineButton';
import IconButton from '../UI/IconButton';


function ImagePicker({onTakeImage}) {
  const [clickedImage, setClickedImage] = useState<string>('');

  async function FImagePicker() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your phones camera',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask me later',
        },
      );
      // console.log(PermissionsAndroid.RESULTS.GRANTED, "-" ,granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options: CameraOptions = {
          mediaType: 'photo',
          quality: 1.0,
          cameraType: 'back' as CameraType, // Cast to CameraType
        };
    
        launchCamera(options, (response) => {
          if (response.didCancel) {
            Alert.alert('User cancelled image picker');
          } else if (response.errorCode) {
            Alert.alert('ImagePicker Error', response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            const image = { uri: response.assets[0].uri };
            setClickedImage(image.uri);
            onTakeImage(image.uri) 
            Alert.alert('Photo taken!', `Image URI: ${image.uri}`);
          } else {
            Alert.alert('Unexpected error occurred');
          }
        });
      };
      
    } catch (error) {
      console.warn(error);
    }
  }

  let ImageDisplay = (
    <Text style={styles.text}>No image at the moment to display!</Text>
  );

  if (clickedImage) {
    ImageDisplay = <Image style={styles.image} source={{uri: clickedImage}} />;
  }

  return (
    <View>
      <View style={styles.imagecontainer}>{ImageDisplay}</View>
      <OutlineButton
        icon="camera-outline"
        color={Colors.primary500}
        size={50}
        onPress={FImagePicker}>Take Picture</OutlineButton>
        
      {/* <Button title="Open Camera" onPress={FImagePicker} /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    height: '70%',
    width: '100%',
    borderWidth: 3,
    borderColor: Colors.primary500,
    borderRadius: 25,
    backgroundColor: Colors.primary500
  },
  image: {
    borderWidth: 3,
    borderColor: Colors.primary500,
    borderRadius: 25,
    margin: 5,
    height: '70%',
    width: '90%',
  },
  text: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  abc:{
    backgroundColor:'red',
  }
});


export default ImagePicker;