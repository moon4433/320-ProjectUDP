const NetworkObject = require("./class-networkobject.js").NetworkObject;

exports.Map = class Map extends NetworkObject{
    constructor(){
        super();
        this.classID = "WRLD";

		this.position = {x:0,y:0,z:.65};
        this.scale    = {x:20,y:20,z:.2};
    }
    update(game){


    }
    serialize(){
        let b = super.serialize();
        return b;
    }
    deserialize(){
        // TODO: turn object into a byte array
    }
}