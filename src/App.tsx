import { useState } from "react";
import Input from "./Input";

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

function App() {
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [newObjective, setNewObjective] = useState<string>("");
  const defaultKeyResults = {
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metrics: "",
  };
  const [keyResults, setKeyResults] = useState<KeyResultType[]>([
    defaultKeyResults,
  ]);

  function addNewObjective() {
    if (newObjective.length == 0 || keyResults.length == 0) return;
    setObjectives((prev) => [
      ...prev,
      { objective: newObjective, keyResults: keyResults },
    ]);
  }

  function addNewKeyResults() {
    setKeyResults((prev) => [...prev, defaultKeyResults]);
  }

  function handleChange(key: string, value: string, index: number) {
    const keyResultToBeUpdated = keyResults[index];
    keyResults[index] = { ...keyResultToBeUpdated, [key]: value };

    // keyResultObj.key = value;
    setKeyResults([...keyResults]);
  }

  return (
    <main className="w-full h-screen flex justify-between space-y-4">
      <div
        id="addObjective"
        className="w-2/5 overflow-y-scroll border-2 space-y-4 rounded-md bg-gray-50 shadow-md"
      >
        <div className="sticky top-0 bg-gray-50 shadow-sm space-y-3 px-8 py-4">
          <h1 className="font-bold text-lg">OKR Application</h1>

          <div id="objectForm" className="w-full flex space-x-2 items-center">
            <label htmlFor="">Objective</label>
            <Input
              type="text"
              placeholder="Enter a objective"
              className="w-auto flex-grow"
              onChange={(e) => {
                setNewObjective(e.target.value);
              }}
            />
          </div>
        </div>
        <hr />
        <div className="w-full flex flex-col space-y-4 px-8 py-4" id="keyResultForm">
          <h2 className="font-medium">Key Results</h2>
          {keyResults.map((keyResult, index) => (
            <div
              key={index}
              id="firstKeyResult"
              className="flex flex-col space-y-2"
            >
              <Input
                className="flex-grow"
                type="text"
                placeholder="Key Result Title 1"
                onChange={(e) => {
                  handleChange("title", e.target.value, index);
                }}
              />
              <div
                id="firstKeyResultMetrics"
                className="flex justify-between flex-wrap gap-y-2"
              >
                <Input
                  type="number"
                  placeholder="Initial Value"
                  onChange={(e) => {
                    handleChange("initialValue", e.target.value, index);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Current Value"
                  onChange={(e) => {
                    handleChange("currentValue", e.target.value, index);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Metrics Value"
                  onChange={(e) => {
                    handleChange("metrics", e.target.value, index);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Target Value"
                  onChange={(e) => {
                    handleChange("targetValue", e.target.value, index);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          id="submitButton"
          className="flex justify-between sticky bottom-0 bg-gray-50 px-8 py-4"
        >
          <button
            onClick={addNewKeyResults}
            className="bg-blue-400 hover:bg-blue-500  px-4 py-2 rounded-md text-white text-sm font-medium"
          >
            Add key values
          </button>
          <button
            onClick={addNewObjective}
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md text-white text-sm font-medium"
          >
            Add Objective
          </button>
        </div>
      </div>

      <div id="showObjectives" className="w-1/2 overflow-y-scroll flex flex-wrap gap-10">
        {objectives.length > 0 ? (
          objectives.map((iter, index) => {
            return (
              <div key={index} className="w-72 h-max border rounded-md p-5">
                <div className="flex justify-between">
                  <h1 className="font-bold text-lg">
                    {index + 1} {iter.objective}
                  </h1>
                  <button className="text-red-500">Delete</button>
                </div>
                {iter.keyResults.map((elem, index) => (
                  <div key={index}>
                    {iter.keyResults.length > 1 && <hr className="my-3" />}
                    <MetricsLabel
                      label={"Key " + index++}
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
