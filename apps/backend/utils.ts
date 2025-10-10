export const validateNext: Record<string, string[]> = {
    "plant-out": ["depot-in"],
    "depot-out": ["depot-in", "distributor-in"],
    "distributor-out": []
};

export function checkSameLocation(location1: string, location2: string) {
    return location1 === location2
}