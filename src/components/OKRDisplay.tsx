import React, { useState } from "react";
import { KeyResultModalType, ObjectiveType } from "../types/OKRTypes";
import MetricsLabel from "./MetricLabel";
import { SquarePlus, Trash2 } from "lucide-react";
import AddKeyResultModal from "./AddKeyResultModal";

export default function OKRDisplay({
  setObjectives,
  objectives,
}: {
  setObjectives: (e: ObjectiveType[]) => void;
  objectives: ObjectiveType[];
}) {
  const [keyResultModal, setKeyResultModal] = useState<KeyResultModalType>({
    isOpen: false,
    objectiveIndex: -1,
  });

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
              className="w-72 h-max border border-gray-200 rounded-md p-5 shadow"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg w-[180px] truncate mb-2">
                  {iter.objective}
                </h1>
                <div className="flex items-center gap-x-3 -mt-2">
                  <button
                    onClick={() => deleteObjective(objectiveIdx)}
                    className="text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setKeyResultModal({
                        isOpen: true,
                        objectiveIndex: objectiveIdx,
                      })
                    }
                    className="text-green-500"
                  >
                    <SquarePlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {iter.keyResults.length > 0 ? (
                iter.keyResults.map((elem, index) => (
                  <div key={index} className="relative pt-2 bg-gray-100 p-3 my-2 rounded-md">
                    <button
                      onClick={() => deleteKeyResult(objectiveIdx, index)}
                      className="bg-red-500 text-white absolute top-1/2 -translate-y-1/2 -right-10 shadow-lg hover:shadow-inner rounded-full bg-white p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <MetricsLabel
                      className="text-blue-500 font-medium"
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
                    <MetricsLabel label={"Metrics"} value={elem.metrics} />
                  </div>
                ))
              ) : (
                <p className="text-sm">No Key-Results Exists.</p>
              )}
            </div>
          );
        })
      ) : (
        <p>Nothing to show!</p>
      )}
      {keyResultModal.isOpen && (
        <AddKeyResultModal
          keyResultModal={keyResultModal}
          objectives={objectives}
          setObjectives={setObjectives}
          closeModal={() =>
            setKeyResultModal({ isOpen: false, objectiveIndex: -1 })
          }
        />
      )}
    </div>
  );
}
