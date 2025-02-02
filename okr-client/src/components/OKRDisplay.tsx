import {useContext, useEffect, useState} from "react";
import {KeyResultModalType, ObjectiveType} from "../types/OKRTypes";
import MetricsLabel from "./MetricLabel";
import {FilePenLine, LoaderCircle, SquarePlus, Trash2} from "lucide-react";
import AddKeyResultModal from "./AddKeyResultModal";
import {OkrContext} from "../context/OkrProvider";
import * as React from "react";
import {deleteKeyResultOfObjective, deleteOkrsDataFromDB, getOkrsData} from "../database/OKRStore.ts";

export default function OKRDisplay({
                                       objectiveForUpdate,
                                       setObjectiveForUpdate
                                   }: {
    objectiveForUpdate: ObjectiveType;
    setObjectiveForUpdate: React.Dispatch<React.SetStateAction<ObjectiveType>>
}) {
    const {objectives, setObjectives, isWaitingForResponse} = useContext(OkrContext)

    const [keyResultModal, setKeyResultModal] = useState<KeyResultModalType>({
        isOpen: false,
        objectiveIndex: -1,
    });

    useEffect(() => {
        if(!keyResultModal.isOpen){
            (async () => {
                const objectivesResponse = await getOkrsData();
                setObjectives(objectivesResponse);
            })();
        }
    }, [keyResultModal.isOpen])

    function deleteKeyResult(objectiveIdx: number, keyResultIdx: number, keyResultDBId: string) {
        if (objectives === null) return;
        deleteKeyResultOfObjective(keyResultDBId).then(() => {
            const foundObj = objectives.find((_, idx) => objectiveIdx === idx);

            if (foundObj === undefined) return;
            foundObj.keyResults = foundObj?.keyResults.filter(
                (_, krIdx) => krIdx !== keyResultIdx
            );

            const updatedObjectives = objectives.map((objective, idx) => {
                return idx === objectiveIdx ? foundObj : objective;
            });

            setObjectives(updatedObjectives);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function deleteObjective(objectiveIdx: string, index: number) {
        if (objectives === null) return;

        try {
            await deleteOkrsDataFromDB(objectiveIdx);
        } catch (error) {
            alert(error);
        }
        const updatedObjectives = objectives.filter((_, idx) => index !== idx);
        setObjectives(updatedObjectives);
    }


    return (
        <div
            id="showObjectives"
            className="w-1/2 overflow-y-scroll flex flex-wrap gap-10"
        >
            {objectives != null && objectives.length > 0 ? (
                objectives.map((objective, objectiveIdx) => {
                    return (
                        <div
                            key={objectiveIdx}
                            className="relative w-72 h-max border border-gray-200 rounded-md p-5 shadow"
                        >
                            {objective.id === objectiveForUpdate.id && isWaitingForResponse ?
                                (<div
                                    className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-white z-10 bg-opacity-80 border-gray-200">
                                    <LoaderCircle className="w-10 h-10 mr-1 animate-spin"/>
                                </div>)
                                : ""}
                            <div className="flex items-center justify-between">
                                <h1 className="font-bold text-lg w-[180px] truncate mb-2">
                                    {objective.objective}
                                </h1>
                                <div className="flex items-center gap-x-3 -mt-2">
                                    <button
                                        onClick={() => deleteObjective(objective.id, objectiveIdx)}
                                        className="text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4"/>
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
                                        <SquarePlus className="w-4 h-4"/>
                                    </button>
                                    <button onClick={() => {
                                        setObjectiveForUpdate(objective)
                                    }}>
                                        <FilePenLine className="w-4 h-4 text-blue-500"/>
                                    </button>
                                </div>
                            </div>

                            {objective.keyResults && objective.keyResults.length > 0 ? (
                                objective.keyResults.map((keyResult, index) => (
                                    <div key={index} className="relative pt-2 bg-gray-100 p-3 mt-3 rounded-md">
                                        <button
                                            onClick={() => deleteKeyResult(objectiveIdx, index, keyResult.id)}
                                            className="bg-red-500 text-white absolute top-1/2 -translate-y-1/2 -right-10 shadow-lg hover:shadow-inner rounded-full p-2"
                                        >
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
                                        <MetricsLabel
                                            className="text-blue-500 font-medium"
                                            label={"Key"}
                                            value={keyResult.title}
                                        />
                                        <MetricsLabel
                                            label={"Initial Value"}
                                            value={keyResult.initialValue}
                                        />
                                        <MetricsLabel
                                            label={"Current Value"}
                                            value={keyResult.currentValue}
                                        />
                                        <MetricsLabel
                                            label={"Target Value"}
                                            value={keyResult.targetValue}
                                        />
                                        <MetricsLabel label={"Metrics"} value={keyResult.metric}/>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-center">No Key-Results Exists.</p>
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
                    closeModal={() =>
                        setKeyResultModal({isOpen: false, objectiveIndex: -1})
                    }
                />
            )}
        </div>
    );
}
