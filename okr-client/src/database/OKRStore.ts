import {InsertKeyResultType, InsertObjectiveType, KeyResultType, ObjectiveType} from "../types/OKRTypes";

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
        body: JSON.stringify({objective: okr.objective}),
        headers: {
            "Content-Type": "application/json",
        }
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
    const response = await fetch(`http://localhost:3000/objectives`, {
        method: "DELETE",
        body: JSON.stringify({"objectiveId": okrId}),
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (response.status === HTTP_RESPONSE_STATUS.NOT_FOUND) {
        throw new Error("Something Went Wrong");
    }
    return await response.json();
}


async function deleteKeyResultOfObjective(keyResultId: string): Promise<KeyResultType & {id: string, objectiveId: string}> {
    const response = await fetch(`http://localhost:3000/key-results`, {
        method: "DELETE",
        body: JSON.stringify({"id": keyResultId}),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return await response.json();
}

async function addKeyResultToObjective(keyResult: InsertKeyResultType, objectiveId: string): Promise<KeyResultType & {id: string, objectiveId: string}> {
    const response = await fetch(`http://localhost:3000/key-results`, {
        method: "POST",
        body: JSON.stringify([{...keyResult, objectiveId: objectiveId}]),
        headers: {
            "Content-Type": "application/json",
        }
    })

    return await response.json();
}
export {getOkrsData, addOkrsDataToDB, updateOkrsDataToDb, deleteOkrsDataFromDB, deleteKeyResultOfObjective, addKeyResultToObjective};
