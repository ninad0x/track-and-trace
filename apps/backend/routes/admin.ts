import { prismaClient } from "db/client"
import { Router } from "express"
import { v4 as uuidv4 } from "uuid";

export const adminRouter = Router()


adminRouter.get("/employee", async (req, res) => {

    const data = await prismaClient.employee.findMany()

    res.json({
        data
    })
})


// add employee
adminRouter.post("/employee", async (req, res) => {

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
adminRouter.get("/scan/:boxId", async (req, res) => {

    const id = req.params.boxId
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



adminRouter.post("/box", async (req, res) => {

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




adminRouter.get("/plant", async (req, res) => {

    const data = await prismaClient.plant.findMany()

    res.json({
        data
    })
})


adminRouter.post("/plant", async (req, res) => {

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





adminRouter.get("/depot", async (req, res) => {

    const data = await prismaClient.depot.findMany()

    res.json({
        data
    })

})



adminRouter.post("/depot", async (req, res) => {

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



