"use client"

import axios from "axios"
import { useState } from "react"
import { Scan } from "../constants"


export default function Scann() {

    const [boxId, setBoxId] = useState()
    const [boxData, setBoxData] = useState<Scan[]>([])

    async function getBoxData(boxId: string) {

        console.log("get data called");

        const result = await axios.get(`http://localhost:3001/scan/box/${boxId}`)

        setBoxData(result.data.data)
        console.log(result.data.data);
    }


    return  <div className="m-5">
        <div className="w-full h-10 shadow-md rounded-md text-center">BOX SCAN</div>


        <input className="border m-2 w-100" name="boxIdInput" type="text" onChange={(e) => {setBoxId(e.target.value)}} />
        <br />
        <button className="p-2 bg-blue-200 cursor-pointer" type="submit" onClick={() => getBoxData(boxId!)}>Submit</button>

        <table>
        <thead>
            <tr>
            <th>Box ID</th>
            <th>Employee ID</th>
            <th>Location Type</th>
            <th>Scan Type</th>
            <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {boxData.map(scan => (
            <tr key={scan.id}>
                <td>{scan.boxId}</td>
                <td>{scan.employee?.name}</td>
                <td>{scan.locationType}</td>
                <td>{scan.scanType}</td>
                <td>{new Date(scan.scannedAt).toLocaleString()}</td>
            </tr>
            ))}
        </tbody>
        </table>



        {/* {JSON.stringify(boxData)} */}




    </div>
}