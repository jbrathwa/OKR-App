import { useEffect, useState } from "react";
import { ObjectiveType } from "./types/OKRTypes";
import OKRForm from "./components/OKRForm";
import OKRDisplay from "./components/OKRDisplay";
import { getOkrsData } from "./database/OKRStore";
import { Loader2, LoaderCircle } from "lucide-react";
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
        isLoading ? <p className="m-auto text-lg text-blue-400 font-medium flex items-center justify-center">
           <LoaderCircle className="animate-spin mr-2" /> Fetching your data...</p> : <OKRDisplay setObjectives={setObjectives} objectives={objectives} />
      }
    </main>
  );
}

export default App;
