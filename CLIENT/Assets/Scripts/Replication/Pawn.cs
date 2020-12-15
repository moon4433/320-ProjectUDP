using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Pawn : NetworkObject
{
    new public static string classID = "PAWN";

    public bool canPlayerControl = false;

    Vector3 velocity = new Vector3();

    void FixedUpdate()
    {
        if (canPlayerControl)
        {
            int moveX = (int) Input.GetAxisRaw("Horizontal");
            int moveY = (int)Input.GetAxisRaw("Vertical");

            velocity.x = Accelerate(velocity.x, moveX);
            velocity.y = Accelerate(velocity.y, moveY);

            transform.position += new Vector3(velocity.x, velocity.y, 0) * Time.fixedDeltaTime;
        }
    }

    public override void Serialize()
    {
        // TODO ...
    }
    float Accelerate(float vel, float acc)
    {

        if (acc != 0)
        {
            vel += acc * Time.fixedDeltaTime;
        }
        else
        {
            // not pressing Left or Right
            // Slow Down

            if (vel > 0)
            { // moving right
                acc = -1; // accelerate left
                vel += acc * Time.fixedDeltaTime;
                if (vel < 0)
                {
                    vel = 0;
                }
            }

            if (vel < 0)
            { // moving left
                acc = 1; // accelerate right
                vel += acc * Time.fixedDeltaTime;
                if (vel > 0)
                {
                    vel = 0;
                }
            }
        }
        return vel;

    }
    public override int Deserialize(Buffer packet)
    {
        return base.Deserialize(packet);
    }
}
