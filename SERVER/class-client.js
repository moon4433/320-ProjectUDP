const Pawn = require("./class-pawn.js").Pawn;
const Game = require("./class-game.js").Game;
const World = require("./class-map.js").Map;
const Bullet = require("./class-bullet.js").Bullet;

exports.Client = class Client{

	static TIMEOUT = 8;

	constructor(rinfo){

		this.rinfo = rinfo;
		this.input = {
			axisH:0,
			axisV:0,
			shooting:0,
		};


        this.isShooting = 0;

		this.pawn = null;
		this.map = null;
		this.bullet = null;
		this.timeOfLastPacket = Game.Singleton.time; // measured in seconds
	}
	spawnPawn(game){

		if(this.pawn) return; // if pawn exist, do nothing....

		this.pawn = new Pawn();
		game.spawnObject( this.pawn );
			
	}
	spawnMap(game){
		if(this.map) return;

		this.map = new World();
		game.spawnObject(this.map);
	}
	spawnBullet(game, player){
		this.bullet = new Bullet();
		this.bullet.position = player.position;
		game.spawnObject(this.bullet);
	}
	update(){

		const game = Game.Singleton;

		if(game.time > this.timeOfLastPacket + Client.TIMEOUT){
			
			game.server.disconnectClient(this);


		}

		if(this.isShooting == 1){
        	//this.spawnBullet(this.game, this.pawn);
        	console.log("bang");
        	this.isShooting = 0;
        }
	}
	onPacket(packet, game){
		if(packet.length < 4) return; // ignore packet
		const packetID = packet.slice(0,4).toString();

		this.timeOfLastPacket = game.time;

		switch(packetID){

			// TODO: handle other kinds of packets.....

			case "INPT":

				if(packet.length < 6) return;
				
				this.input.axisH = packet.readInt8(4);
				this.input.axisV = packet.readInt8(5);
				this.input.shooting = packet.readInt8(6);
				
				// send input to Pawn object:
				if(this.pawn) this.pawn.input = this.input;
				if(this.input.shooting == 1) this.isShooting = 1;
				break;

			default:
				console.log("ERROR: packet type not recognized");
				break;
		}
	}
}