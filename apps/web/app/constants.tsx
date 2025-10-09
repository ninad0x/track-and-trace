export interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface Scan {
  id: string;
  boxId: string;
  employeeId?: string | null;
  locationType: string;
  locationId: string;
  scanType: "in" | "out";
  scannedAt: string;
  latitude?: number | null;
  longitude?: number | null;
  employee?: Employee | null;
}

export interface Plant {
  id: string;
  name: string;
}

export interface Box {
  id: string;
  uid: string;
  plantId: string;
  manufacturedAt: string;
  orderId?: string | null;
  plant?: Plant;
  scans?: Scan[];
}