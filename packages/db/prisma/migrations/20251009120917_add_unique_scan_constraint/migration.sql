/*
  Warnings:

  - A unique constraint covering the columns `[boxId,locationType,locationId,scanType,scannedAt]` on the table `Scan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Scan_boxId_locationType_locationId_scanType_scannedAt_key" ON "Scan"("boxId", "locationType", "locationId", "scanType", "scannedAt");
