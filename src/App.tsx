import { useState } from "react";
import { ObjectiveType } from "./types/OKRTypes";
import OKRForm from "./components/OKRForm";
import OKRDisplay from "./components/OKRDisplay";
function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  

  return (
    <main className="w-full h-screen flex justify-between space-y-4">
      <OKRForm setObjectives={setObjectives} objectives={objectives} />
      <OKRDisplay setObjectives={setObjectives} objectives={objectives} />
    </main>
  );
}

export default App;
