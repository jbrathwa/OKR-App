import { useContext, useEffect, useState } from "react";
import { ObjectiveType } from "./types/OKRTypes";
import OKRForm from "./components/OKRForm";
import OKRDisplay from "./components/OKRDisplay";
import { getOkrsData } from "./database/OKRStore";
import { LoaderCircle } from "lucide-react";
import { OkrContext } from "./context/OkrProvider";

function App() {
  const {objectives, setObjectives} = useContext(OkrContext);

  const [objectiveForUpdate, setObjectiveForUpdate] = useState<ObjectiveType>({
    id: "",
    objective: "",
    keyResults: [
      {
        title: "",
        initialValue: 0,
        currentValue: 0,
        targetValue: 0,
        metrics: "",
      },
    ],
  });

  
  const isLoading = objectives?.length === 0;
  
  useEffect(() => {
    (async () => {
      const objectivesResponse = await getOkrsData();
      setObjectives(objectivesResponse);
    })();
  }, []);

  return (
    <main className="w-full h-screen flex justify-between space-y-4">
      <OKRForm objectiveForUpdate={objectiveForUpdate} />
      {isLoading ? (
        <p className="m-auto text-lg text-blue-400 font-medium flex items-center justify-center">
          <LoaderCircle className="animate-spin mr-2" /> Fetching your data...
        </p>
      ) : (
        <OKRDisplay
            objectiveForUpdate={objectiveForUpdate}
          setObjectiveForUpdate={setObjectiveForUpdate}
        />
      )}
    </main>
  );
}

export default App;
