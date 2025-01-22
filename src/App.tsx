import { useState } from "react";
import Input from "./Input";
import { ObjectiveType } from "./types/OKRTypes";
import OKRForm from "./components/OKRForm";


function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  
  


  function deleteKeyResult(objectiveIdx: number, keyResultIdx: number){
    const foundObj = objectives.find((_, idx)=> objectiveIdx === idx);
    console.log(keyResultIdx, objectiveIdx)
    if(foundObj === undefined) return;
    foundObj.keyResults = foundObj?.keyResults.filter((_, krIdx) => krIdx !== keyResultIdx);
    const updatedObjectives = objectives.map((objective, idx)=>{
      return idx === objectiveIdx ? foundObj : objective;
    })
    console.log(updatedObjectives)
    setObjectives(updatedObjectives);
  }

  return (
    <main className="w-full h-screen flex justify-between space-y-4">
      
      <OKRForm setObjectives={setObjectives} objectives={objectives} />
      <div id="showObjectives" className="w-1/2 overflow-y-scroll flex flex-wrap gap-10">
        {objectives.length > 0 ? (
          objectives.map((iter, objectiveIdx) => {
            return (
              <div key={objectiveIdx} className="w-72 h-max border rounded-md p-5">
                <div className="flex justify-between">
                  <h1 className="font-bold text-lg">
                    {objectiveIdx} {iter.objective}
                  </h1>
                </div>
                {iter.keyResults.map((elem, index) => (
                  <div key={index}>
                    {iter.keyResults.length > 1 && <hr className="my-3" />}
                    <button onClick={() => deleteKeyResult(objectiveIdx, index)} className="text-red-500">Delete</button>
                    <MetricsLabel
                      label={"Key"}
                      value={elem.title}
                    />
                    <MetricsLabel
                      label={"Initial Value"}
                      value={elem.initialValue}
                    />
                    <MetricsLabel
                      label={"Current Value"}
                      value={elem.currentValue}
                    />
                    <MetricsLabel
                      label={"Target Value"}
                      value={elem.targetValue}
                    />
                    <MetricsLabel
                      label={"Metrics"}
                      value={elem.metrics}
                    />
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <p>Nothing to show!</p>
        )}
      </div>
    </main>
  );
}

const MetricsLabel = ({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) => {
  return (
    <p className="w-full flex justify-between text-sm my-1">
      <b className="text-gray-700">{label}</b> {value}
    </p>
  );
};

export default App;
