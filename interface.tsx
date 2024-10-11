import { NavigationAction } from "@react-navigation/native";

export interface IAllPlaces{
   route?:any;

}


export interface IPlaceList{
    places?:any;
    id?:number;
    item?:string;
}

export interface IPlaceItem{
    place?:any;
    onSelect?:any
}

export interface IAddPlace{
    // navigation?:NavigationAction
    onCreatePlace: (place: string) => void;
    navigation?:any;
   

}
export interface IPlaceForm{
    enteredText?:any;
    changeTitleHandler?:()=>{};
    onCreatePlace: (place: string) => void;
}

export interface IC{
    icon?:any;
    size?:number;
    color?:string;
    onpress?:()=>{};
}

export interface ILocationPicker{
    color?:string,
    size?:number,
}

export interface IMap{
    // navigation?:NavigationAction;
    navigation?:any;
    event?:any;
    

}