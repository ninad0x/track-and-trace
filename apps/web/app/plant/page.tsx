"use client"

import axios from "axios";
import { useEffect, useState } from "react"

export default function Plant() {

    const [plantData, setplantData] = useState<any[]>([]);

    const getData = async() => {
        const result = await axios.get("http://localhost:3001/plant")
        setplantData(result.data.data)
        console.log(result.status);
        console.log(result.data);
        
    }

    useEffect(() => {
        getData();
    }, [])

    return <div className="flex-col justify-center m-5">
        <div className="flex items-center justify-center shadow-md rounded-2xl h-20 w-full">Plant data</div>
        <div className="p-4">
            {plantData.map((e) => {
                return <p key={e.id}>{e.name}</p>
            })}
        </div>

    </div>
}