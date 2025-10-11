






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
