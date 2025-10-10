import express from "express";
import cors from "cors"
import { prismaClient } from "db/client";
import { v4 as uuidv4 } from "uuid";
import { validateNext } from "./utils";

const app = express();


app.use(express.json());
app.use(cors())

app.get("/employee", async (req, res) => {

    const data = await prismaClient.employee.findMany()

    res.json({
        data
    })
})


// add employee
app.post("/employee", async (req, res) => {

    try {
        const { name, role, } = req.body
    
        const data = await prismaClient.employee.create({
            data: {
                name: name,
                role: role,
            }
        })
    
        res.json({
            data
        })
    } catch (error) {

        res.json({
            message: error
        })
    }
})


// get box
app.get("/scan/box/:id", async (req, res) => {

    const id = req.params.id
    console.log(id);
    
    const data = await prismaClient.scan.findMany({
        where: {
            boxId: id
        },
        select: {
            scannedAt: true,
            locationType: true,
            scanType: true,
            employee: {
                select: {
                    name: true,
                    role: true
                }
            }
        },


    })

    res.json({
        data
    });
})



app.post("/box", async (req, res) => {

    try {
        const { plantId } = req.body
    
        const data = await prismaClient.box.create({
            data: {
                uid: uuidv4(),
                plantId: plantId
            }
        })
    
        res.json({
            data
        })
    } catch (error) {

        res.json({
            message: error
        })
    }
})




app.get("/plant", async (req, res) => {

    const data = await prismaClient.plant.findMany()

    res.json({
        data
    })
})


app.post("/plant", async (req, res) => {

    try {
        const { name, location, latitude, longitude} = req.body
    
        const data = await prismaClient.plant.create({
            data: {
                name: name,
                location: location,
                latitude: latitude,
                longitude: longitude
            }
        })
    
        res.json({
            message: "plant added",
            data
        })
    } catch (error) {
        res.json({
            error
        })
    }
})





app.get("/depot", async (req, res) => {

    const data = await prismaClient.depot.findMany()

    res.json({
        data
    })

})



app.post("/depot", async (req, res) => {

    try {
        const { name, location, latitude, longitude} = req.body
    
        const data = await prismaClient.depot.create({
            data: {
                name: name,
                location: location,
                latitude: latitude,
                longitude: longitude
            }
        })
    
        res.json({
            message: "depot added",
            data
        })
    } catch (error) {
        res.json({
            error
        })
    }
})


app.post("/scan", async (req, res) => {

    try {
        const { boxId, employeeId, locationType, locationId, latitude, longitude, scanType} = req.body
        
        // last scan for the box
        const lastScan = await prismaClient.scan.findFirst({
            where: { boxId },
            orderBy: { scannedAt: "desc" },
        });

        // if no last scan (new scan)
        if (!lastScan && !(locationType === "plant" && scanType === "in")) {
            return res.status(400).json({ 
                error: "First scan must be plant-in"
            });
        }

        const lastKey = `${lastScan?.locationType}-${lastScan?.scanType}`
        const newKey = `${locationType}-${scanType}`
        const allowed = validateNext[lastKey]

        console.log(allowed);
    
        const data = await prismaClient.scan.create({
            data: {
                boxId,
                employeeId,
                locationType,
                locationId,
                scanType,
                latitude,
                longitude,
            }
        })
    
        res.json({
            message: "scan recorded",
            data
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

app.listen(3001);