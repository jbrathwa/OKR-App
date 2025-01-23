import { InsertObjectiveType, ObjectiveType } from "../types/OKRTypes";
import { v4 as uuidv4 } from "uuid";

const db = new Map<string, ObjectiveType>();

const defaultObjectives = [
  {
    id: uuidv4(),
    objective: "Hire frontend Developer",
    keyResults: [
      {
        title: "Complete React Course",
        initialValue: 0,
        currentValue: 0,
        targetValue: 0,
        metrics: "",
      },
    ],
  },
];

defaultObjectives.forEach((objective: ObjectiveType) => {
  db.set(objective.id, objective);
});

function getOkrsData(): Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(db.values()));
    }, 1000);
  });
}

function addOkrsDataToDB(okr: InsertObjectiveType): Promise<ObjectiveType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let id = uuidv4();
      let objectiveTobeAdded = { id, ...okr };
      db.set(id, objectiveTobeAdded);
      resolve(objectiveTobeAdded);
    }, 1000);
  });
}

function updateOkrsDataToDb(objectiveTobeUpdated: InsertObjectiveType, okrId: string) : Promise<ObjectiveType>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      let updatedObjectiveWithId = {id: okrId, ...objectiveTobeUpdated};
      db.set(okrId, updatedObjectiveWithId);
      resolve(updatedObjectiveWithId);
    }, 1000)
  })
}

export { getOkrsData, addOkrsDataToDB, updateOkrsDataToDb };
