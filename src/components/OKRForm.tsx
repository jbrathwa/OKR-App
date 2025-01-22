import React, { useState } from "react";
import Input from "./Input";
import { KeyResultType, ObjectiveType } from "../types/OKRTypes";
import { addOkrsDataToDB } from "../database/OKRStore";
import { Loader, LoaderCircle } from "lucide-react";

const defaultKeyResults = {
  title: "",
  initialValue: 0,
  currentValue: 0,
  targetValue: 0,
  metrics: "",
};

export default function OKRForm({
  setObjectives,
  objectives,
}: {
  setObjectives: (e: ObjectiveType[]) => void;
  objectives: ObjectiveType[];
}) {
  const [isWaitingForInsert, setIsWaitingForInsert] = useState<boolean>(false);
  const [newObjective, setNewObjective] = useState<string>("");
  const [keyResults, setKeyResults] = useState<KeyResultType[]>([
    defaultKeyResults,
  ]);

  function handleChange(key: string, value: string, index: number) {
    const keyResultToBeUpdated = keyResults[index];
    keyResults[index] = { ...keyResultToBeUpdated, [key]: value };

    setKeyResults([...keyResults]);
  }

  function addNewObjective() {
    setIsWaitingForInsert(true);      
    if (newObjective.length == 0 || keyResults.length == 0) return;
    const objectiveToBeAdded = { objective: newObjective, keyResults: keyResults };
    addOkrsDataToDB(objectiveToBeAdded).then(()=>{
      setObjectives([
        ...objectives,
        objectiveToBeAdded
      ])
      setKeyResults([defaultKeyResults]);
      setNewObjective("");
      setIsWaitingForInsert(false);
    }).catch((error)=>{
      console.log(error)
    })
  }

  function addNewKeyResults() {
    setKeyResults((prev) => [...prev, defaultKeyResults]);
  }
  return (
    <div
      id="addObjective"
      className="w-2/5 overflow-y-scroll border-2 space-y-4 rounded-md bg-gray-50 shadow-md"
    >
      <div className="sticky top-0 bg-gray-50 shadow-sm space-y-3 px-8 py-4">
        <h1 className="font-bold text-lg text-blue-500 text-center">OKR Application</h1>

        <div id="objectForm" className="w-full flex flex-col space-y-2">
          <label className="font-medium" htmlFor="">Objective</label>
          <Input
            type="text"
            placeholder="Enter a objective"
            className="flex-grow"
            value={newObjective}
            onChange={(e) => {
              setNewObjective(e.target.value);
            }}
          />
        </div>
      </div>
      <hr />
      <div
        className="w-full flex flex-col space-y-4 px-8 py-4"
        id="keyResultForm"
      >
        <h2 className="font-medium">Key Results</h2>
        {keyResults.map((keyResult, index) => (
          <div
            key={index}
            id="firstKeyResult"
            className="flex flex-col space-y-2"
          >
            <Input
              className="flex-grow"
              value={keyResult.title}
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
                value={keyResult.initialValue}
                type="number"
                placeholder="Initial Value"
                onChange={(e) => {
                  handleChange("initialValue", e.target.value, index);
                }}
              />
              <Input
                type="number"
                value={keyResult.currentValue}
                placeholder="Current Value"
                onChange={(e) => {
                  handleChange("currentValue", e.target.value, index);
                }}
              />
              <Input
                type="text"
                value={keyResult.metrics}
                placeholder="Metrics Value"
                onChange={(e) => {
                  handleChange("metrics", e.target.value, index);
                }}
              />
              <Input
                type="number"
                value={keyResult.targetValue}
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
          Add key Results
        </button>
        <button
          onClick={addNewObjective}
          className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md text-white text-sm font-medium flex items-center"
        >
          {isWaitingForInsert && <LoaderCircle className="w-4 h-4 mr-1 animate-spin" />} Add Objective
        </button>
      </div>
    </div>
  );
}
