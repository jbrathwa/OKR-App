type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metrics: string;
};

type ObjectiveType = {
  id: string;
  objective: string;
  keyResults: KeyResultType[];
};

type KeyResultModalType = {
  isOpen: boolean;
  objectiveIndex: number;
};

type InsertObjectiveType = Omit<ObjectiveType, "id">

export type {
  KeyResultType,
  ObjectiveType,
  KeyResultModalType,
  InsertObjectiveType,
};
