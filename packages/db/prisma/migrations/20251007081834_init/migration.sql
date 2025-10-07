-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Depot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Depot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepotPlant" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "depotId" TEXT NOT NULL,

    CONSTRAINT "DepotPlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "depotId" TEXT NOT NULL,

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "manufacturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" TEXT,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL,
    "boxId" TEXT NOT NULL,
    "employeeId" TEXT,
    "locationType" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "scanType" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_depotplant_plantId" ON "DepotPlant"("plantId");

-- CreateIndex
CREATE INDEX "idx_depotplant_depotId" ON "DepotPlant"("depotId");

-- CreateIndex
CREATE UNIQUE INDEX "DepotPlant_plantId_depotId_key" ON "DepotPlant"("plantId", "depotId");

-- CreateIndex
CREATE INDEX "idx_orders_distributorId" ON "Order"("distributorId");

-- CreateIndex
CREATE INDEX "idx_orders_status" ON "Order"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Box_uid_key" ON "Box"("uid");

-- CreateIndex
CREATE INDEX "idx_boxes_uid" ON "Box"("uid");

-- CreateIndex
CREATE INDEX "idx_boxes_orderId" ON "Box"("orderId");

-- CreateIndex
CREATE INDEX "idx_boxes_plantId" ON "Box"("plantId");

-- CreateIndex
CREATE INDEX "idx_scans_boxId" ON "Scan"("boxId");

-- CreateIndex
CREATE INDEX "idx_scans_employeeId" ON "Scan"("employeeId");

-- CreateIndex
CREATE INDEX "idx_scans_locationType_locationId" ON "Scan"("locationType", "locationId");

-- CreateIndex
CREATE INDEX "idx_scans_scannedAt" ON "Scan"("scannedAt");

-- AddForeignKey
ALTER TABLE "DepotPlant" ADD CONSTRAINT "DepotPlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepotPlant" ADD CONSTRAINT "DepotPlant_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Distributor" ADD CONSTRAINT "Distributor_depotId_fkey" FOREIGN KEY ("depotId") REFERENCES "Depot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
