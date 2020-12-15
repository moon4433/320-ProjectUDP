const NetworkObject = require("./class-networkobject.js").NetworkObject;

exports.Pawn = class Pawn extends NetworkObject{
    constructor(){
        super();
        this.classID = "PAWN";

        this.velocity = {x:0,y:0,z:0};

        this.input = {};
    }
    accelerate(vel, acc, dt){

        if(acc){
            vel += acc * dt;
        }
        else{
            // not pressing Left or Right
            // Slow Down

            if(vel > 0){ // moving right
                acc = -1; // accelerate left
                vel += acc * dt;
                if(vel < 0){
                    vel = 0
                }
            }

            if(vel < 0){ // moving left
                acc = 1; // accelerate right
                vel += acc * dt;
                if(vel > 0){
                    vel = 0
                }
            }
        }
        return vel ? vel : 0;

    }
    update(game){


        let moveX = this.input.axisH|0;  // -1, 0, or 1
        let moveY = this.input.axisV|0;

        this.velocity.x = this.accelerate(this.velocity.x, moveX, game.dt);
        this.velocity.y = this.accelerate(this.velocity.y, moveY, game.dt);

        this.position.x += this.velocity.x * game.dt;
        this.position.y += this.velocity.y * game.dt;

    }
    serialize(){
        let b = super.serialize();
        return b;
    }
    deserialize(){
        // TODO: turn object into a byte array
    }
}