import {InsertObjectiveType, ObjectiveType} from "../types/OKRTypes";

const HTTP_RESPONSE_STATUS = {
    NOT_FOUND: 404,
}

async function getOkrsData(): Promise<ObjectiveType[]> {
    const response = await fetch("http://localhost:3000/objectives");
    return await response.json();
}

async function addOkrsDataToDB(okr: InsertObjectiveType): Promise<ObjectiveType> {
    const response = await fetch("http://localhost:3000/objectives", {
        method: "POST",
        body: JSON.stringify(okr),
    })

    return await response.json();
}

async function updateOkrsDataToDb(objectiveTobeUpdated: InsertObjectiveType, okrId: string): Promise<ObjectiveType> {
    const response = await fetch(`http://localhost:3000/objectives/${okrId}`, {
        method: "PUT",
        body: JSON.stringify(objectiveTobeUpdated),
    })
    return await response.json();
}

async function deleteOkrsDataFromDB(okrId: string): Promise<ObjectiveType> {
    const response = await fetch(`http://localhost:3000/objectives/${okrId}`, {
        method: "DELETE"
    })
    if (response.status === HTTP_RESPONSE_STATUS.NOT_FOUND) {
        throw new Error("Something Went Wrong");
    }
    return await response.json();
}

export {getOkrsData, addOkrsDataToDB, updateOkrsDataToDb, deleteOkrsDataFromDB};
