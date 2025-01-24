import { InsertObjectiveType, ObjectiveType } from "../types/OKRTypes";

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

async function updateOkrsDataToDb(objectiveTobeUpdated: InsertObjectiveType, okrId: string) : Promise<ObjectiveType>{
  const response = await fetch(`http://localhost:3000/objectives/${okrId}`, {
    method: "PUT",
    body: JSON.stringify(objectiveTobeUpdated),
  })

  return response.json();
}

async function deleteOkrsDataFromDB(okrId: string) : Promise<ObjectiveType> {
  const response = await fetch(`http://localhost:3000/objectives/${okrId}`, {
    method: "DELETE"
  })

  return await response.json();
}

export { getOkrsData, addOkrsDataToDB, updateOkrsDataToDb, deleteOkrsDataFromDB };
