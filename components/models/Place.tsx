export class Place{

    
    constructor(title,imageUri,location,id){
        this.title=title;
        this.imageUri=imageUri;
        this.address=location.address;
        this.location={lat:location.lat,lng:location.lng};// lat{lat:0.23232, lng:127.4445}
        this.id =id;
    }
}