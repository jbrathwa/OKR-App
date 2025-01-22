import { ObjectiveType } from "../types/OKRTypes";

let dbIndex = 1;

const db = new Map<number, ObjectiveType>();

const defaultObjectives = [
  {
    id: dbIndex++,
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

defaultObjectives.forEach((objective, index) => {
    db.set(objective.id, objective);
})

function getOkrsData() : Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(db.values()));
    }, 3000);
  });
}

function addOkrsDataToDB(okr : ObjectiveType): Promise<void>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            db.set(dbIndex++, okr);
            resolve();
        }, 3000)
    })
}
export { getOkrsData, addOkrsDataToDB };
