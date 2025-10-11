"use client"

import axios from "axios"
import { useState } from "react"
import { Scan } from "../constants"


export default function Scann() {

    const [boxId, setBoxId] = useState()
    const [boxData, setBoxData] = useState<Scan[]>([])

    async function getBoxData(boxId: string) {

        console.log("get data called");

        const result = await axios.get(`http://localhost:3001/admin/scan/${boxId}`)

        setBoxData(result.data.data)
        console.log(result.data.data);
    }


    return  <div className="m-5">
        <div className="w-full h-10 shadow-md rounded-md text-center">BOX SCAN</div>

        Enter box Id
        <input className="border m-2 w-100" name="boxIdInput" type="text" onChange={(e) => {setBoxId(e.target.value)}} />
        <br />
        <button className="p-2 bg-blue-200 cursor-pointer" type="submit" onClick={() => getBoxData(boxId!)}>Submit</button>

        <table className="w-full my-2">
        <thead className="bg-red-200">
            <tr>
            <th>Employee</th>
            <th>Location Type</th>
            <th>Scan Type</th>
            <th>Date</th>
            <th>Time</th>
            </tr>
        </thead>
        <tbody className="bg-green-200 text-center">
            {boxData.map(scan => (
            <tr key={scan.scannedAt}>
                <td>{scan.employee?.name}</td>
                <td>{scan.locationType}</td>
                <td>{scan.scanType}</td>
                <td>{new Date(scan.scannedAt).toLocaleDateString()}</td>
                <td>{new Date(scan.scannedAt).toLocaleTimeString()}</td>
            </tr>
            ))}
        </tbody>
        </table>



        {/* {JSON.stringify(boxData)} */}




    </div>
}