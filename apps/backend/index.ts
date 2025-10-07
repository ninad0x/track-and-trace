import express from "express";
import { prismaClient } from "db/client";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

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
app.get("/box/:id", async (req, res) => {

    const id = req.query.id as string
    console.log(id);
    

    const data = await prismaClient.box.findFirst({
        where: {
            uid: id
        },
        include: {
            plant: {
                select: { name: true, location: true }
            },
        }
    })

    console.log(data);
    

    res.json({
      uid: data?.uid,
      manufacturedAt: data?.manufacturedAt,
      plantName: data?.plant.name,
      plantLocation: data?.plant?.location,
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

app.listen(3000);