import { createContext, ReactElement, useState } from "react";
import { ObjectiveType } from "../types/OKRTypes";

type OkrContextType = {
  objectives: ObjectiveType[] | null;
  setObjectives: React.Dispatch<React.SetStateAction<ObjectiveType[] | null>>;
};

export const OkrContext = createContext<OkrContextType>({
  objectives: [],
  setObjectives: () => {},
});

const OkrProvider = ({ children }: { children: ReactElement }) => {
  const [objectives, setObjectives] = useState<ObjectiveType[] | null>([]);

  return (
    <OkrContext.Provider value={{ objectives, setObjectives }}>
      {children}
    </OkrContext.Provider>
  );
};

export default OkrProvider;
