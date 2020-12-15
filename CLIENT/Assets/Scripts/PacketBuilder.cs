using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class PacketBuilder
{

    static int previousInputH = 0;
    static int previousInputV = 0;

    public static Buffer CurrentInput()
    {
        int h = (int)Input.GetAxisRaw("Horizontal"); // (-1 | 0 | 1)
        int v = (int)Input.GetAxisRaw("Vertical");
        int shooting = 0;

        if (Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.RightArrow))
        {
            if (h == previousInputH) return null;

            previousInputH = h;

        }

        if (Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.DownArrow))
        {
            if (v == previousInputV) return null;

            previousInputV = v;

        }

        if (Input.GetMouseButton(0))
        {
            shooting = 1;
        }
        else
        {
            shooting = 0;
        }

        Buffer b = Buffer.Alloc(7);
        b.WriteString("INPT", 0);
        b.WriteInt8((sbyte)h, 4);
        b.WriteInt8((sbyte)v, 5);
        b.WriteInt8((sbyte)shooting, 6);

        return b;
    }
}
