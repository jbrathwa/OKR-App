import React from "react";
import { ObjectiveType } from "../types/OKRTypes";
import MetricsLabel from "./MetricLabel";

export default function OKRDisplay({
  setObjectives,
  objectives,
}: {
  setObjectives: (e: ObjectiveType[]) => void;
  objectives: ObjectiveType[];
}) {
  function deleteKeyResult(objectiveIdx: number, keyResultIdx: number) {
    const foundObj = objectives.find((_, idx) => objectiveIdx === idx);

    if (foundObj === undefined) return;
    foundObj.keyResults = foundObj?.keyResults.filter(
      (_, krIdx) => krIdx !== keyResultIdx
    );

    const updatedObjectives = objectives.map((objective, idx) => {
      return idx === objectiveIdx ? foundObj : objective;
    });

    setObjectives(updatedObjectives);
}

function deleteObjective(index: number) {
    const updatedObjectives = objectives.filter((_, idx) => index !== idx);
    setObjectives(updatedObjectives);
  }

  return (
    <div
      id="showObjectives"
      className="w-1/2 overflow-y-scroll flex flex-wrap gap-10"
    >
      {objectives.length > 0 ? (
        objectives.map((iter, objectiveIdx) => {
          return (
            <div
              key={objectiveIdx}
              className="w-72 h-max border rounded-md p-5"
            >
              <div className="flex justify-between">
                <h1 className="font-bold text-lg">
                  {objectiveIdx} {iter.objective}
                </h1>
                <button onClick={() => deleteObjective(objectiveIdx)} className="text-red-500">Delete Objective</button>
              </div>
              {iter.keyResults.map((elem, index) => (
                <div key={index}>
                  {iter.keyResults.length > 1 && <hr className="my-3" />}
                  <button
                    onClick={() => deleteKeyResult(objectiveIdx, index)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  <MetricsLabel label={"Key"} value={elem.title} />
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
                  <MetricsLabel label={"Metrics"} value={elem.metrics} />
                </div>
              ))}
            </div>
          );
        })
      ) : (
        <p>Nothing to show!</p>
      )}
    </div>
  );
}
