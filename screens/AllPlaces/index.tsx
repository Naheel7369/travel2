import { FC, useEffect, useState } from "react";
import { IAllPlaces } from "../../interface";
import PlaceList from "../../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../../Util/database";

const AllPlaces: FC<IAllPlaces> = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]); // Specify state type
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadedPlaces() {
        console.log("HNIIII")
     const places =  await fetchPlaces();
     console.log("places===>",places);
     
     setLoadedPlaces(places);
    }
    if (isFocused ) { 
        loadedPlaces();
        // Ensure route.params.place exists
    //   setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused]); // Add missing dependencies

  return <PlaceList places={loadedPlaces} />;
};

export default AllPlaces;
