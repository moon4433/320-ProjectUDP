
const NetworkObject = require("./class-networkobject.js").NetworkObject;
const Player = require("./class-pawn.js").Pawn;

exports.Bullet = class Bullet extends NetworkObject{
	constructor(){
		super();
		this.classID = "BLLT";

		this.velocity = {x:5,y:0,z:0};

		this.player = new Player();

		this.position = {x:0,y:0,z:0};
        this.scale    = {x:.5,y:.5,z:.5};
	}
	update(game){
		// bullet logic...
		this.position.x += this.velocity.x * game.dt;
	}
	serialize(){
		const p = super.serialize();
		// add to packet
		return p;
	}
}