import { useEffect, useState } from "react";
import { ObjectiveType } from "./types/OKRTypes";
import OKRForm from "./components/OKRForm";
import OKRDisplay from "./components/OKRDisplay";
import { getOkrsData } from "./database/OKRStore";
function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[] | undefined>();
  
  const isLoading = objectives === undefined;
  useEffect(()=>{
      (async ()=>{
        const objectivesResponse = await getOkrsData();
        setObjectives(objectivesResponse);
      })();
  }, [])

  return (
    <main className="w-full h-screen flex justify-between space-y-4">
      <OKRForm setObjectives={setObjectives} objectives={objectives ?? []} />
      {
        isLoading ? "Loading..." : <OKRDisplay setObjectives={setObjectives} objectives={objectives} />
      }
    </main>
  );
}

export default App;
