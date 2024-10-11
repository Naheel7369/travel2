import { FC } from "react"
import { IAddPlace } from "../../interface"
import Placeform from "../../components/Places/PlaceForm";
import { insertPlace } from "../../Util/database";


const  AddPlace:FC<IAddPlace>=({navigation})=>{
   async function createPlaceHandler(place){
      await  insertPlace(place);

        navigation.navigate('AllPlaces');
        
    }
return <Placeform onCreatePlace={createPlaceHandler}/>;
}

export default AddPlace;

