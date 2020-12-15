using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Map : NetworkObject
{
    new public static string classID = "WRLD";

    public override int Deserialize(Buffer packet)
    {
        return base.Deserialize(packet);
    }


}
