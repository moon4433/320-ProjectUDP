using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : NetworkObject
{
    new public static string classID = "BLLT";

    Vector3 velocity = new Vector3();

    public override int Deserialize(Buffer packet)
    {
        return base.Deserialize(packet);
    }


}
