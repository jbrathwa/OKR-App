type KeyResultType = {
  id: string;
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metric: string;
};

type InsertKeyResultType = Omit<KeyResultType, "id">;

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
  InsertKeyResultType
};
