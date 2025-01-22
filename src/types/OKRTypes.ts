type KeyResultType = {
  title: string;
  initialValue: number;
  currentValue: number;
  targetValue: number;
  metrics: string;
};

type ObjectiveType = {
  objective: string;
  keyResults: KeyResultType[];
};
type KeyResultModalType = {
    isOpen: boolean,
    objectiveIndex: number
}

export type {KeyResultType, ObjectiveType, KeyResultModalType}; 