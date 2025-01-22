import { ObjectiveType } from "../types/OKRTypes";

const defaultObjectives: ObjectiveType[] = [
  {
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

function getOkrsData() : Promise<ObjectiveType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(defaultObjectives);
    }, 2000);
  });
}

export { getOkrsData };
