import {useContext, useEffect, useState} from "react";
import Input from "./Input";
import {KeyResultType, ObjectiveType} from "../types/OKRTypes";
import {addKeyResultToObjective, addOkrsDataToDB, updateOkrsDataToDb} from "../database/OKRStore";
import {LoaderCircle} from "lucide-react";
import {OkrContext} from "../context/OkrProvider";

const defaultKeyResults = {
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
};

export default function OKRForm({
                                    objectiveForUpdate,
                                }: {
    objectiveForUpdate: ObjectiveType;
}) {
    const {
        objectives,
        setObjectives,
        isWaitingForResponse,
        setIsWaitingForResponse,
    } = useContext(OkrContext);
    const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
    const [newObjective, setNewObjective] = useState<string>("");
    const [keyResults, setKeyResults] = useState<KeyResultType[]>([
        defaultKeyResults,
    ]);

    useEffect(() => {
        if (objectiveForUpdate.id) {
            setNewObjective(objectiveForUpdate.objective);
            setKeyResults(objectiveForUpdate.keyResults);
            setIsUpdateForm(true);
        }
    }, [objectiveForUpdate]);

    function handleChange(key: string, value: string | number, index: number) {
        const keyResultToBeUpdated = keyResults[index];
        keyResults[index] = {...keyResultToBeUpdated, [key]: value};

        setKeyResults([...keyResults]);
    }

    function addNewObjective() {
        // validation
        if (newObjective.length == 0 || keyResults.length == 0) {
            alert("Please fill all required field value");
            return;
        }

        // set loader true
        setIsWaitingForResponse(true);
        const objectiveToBeAdded = {objective: newObjective};

        // inserting objective into db.
        addOkrsDataToDB(objectiveToBeAdded)
            .then((objectiveResponse: ObjectiveType) => {
                if (objectives === null) return;
                console.log(keyResults);
                if (keyResults[0].title != "") {
                    addKeyResultToObjective(keyResults, objectiveResponse.id).then((keyResultsResponse) => {
                        const objectiveToBeAddedToState = {...objectiveResponse, keyResults: keyResultsResponse};
                        console.warn(objectiveToBeAddedToState);

                        setObjectives([...objectives, objectiveToBeAddedToState]);
                    })
                } else {
                    setObjectives([...objectives, objectiveResponse]);
                }

                setKeyResults([defaultKeyResults]);
                setNewObjective("");
                setIsWaitingForResponse(false);
            })
            .catch((error) => {
                alert(error)
            });
    }

    function handleUpdateObjective() {
        setIsWaitingForResponse(true);

        const okrsToBeUpdated = {
            id: objectiveForUpdate.id,
            objective: newObjective,
            keyResults: keyResults.map((keyResult) => {return {...keyResult, id: objectiveForUpdate.keyResults[0].id, objectiveId: objectiveForUpdate.keyResults[0].objectiveId}}),
        };

        updateOkrsDataToDb(okrsToBeUpdated).then(
            (data) => {
                if (objectives === null) return;
                const updatedObjectives = objectives.map((objective) => {
                    return objective.id === data.id ? okrsToBeUpdated
                        : objective;
                });

                setObjectives([...updatedObjectives]);

                // Reset
                setNewObjective("");
                setKeyResults([defaultKeyResults]);
                setTimeout(() => {
                    setIsUpdateForm(false);
                    setIsWaitingForResponse(false);
                }, 3000);
            }
        );
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
                <h1 className="font-bold text-lg text-blue-500 text-center">
                    OKR Application
                </h1>

                <div id="objectForm" className="w-full flex flex-col space-y-2">
                    <label className="font-medium" htmlFor="">
                        Objective
                    </label>
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
            <hr/>
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
                                    handleChange("initialValue", parseInt(e.target.value), index);
                                }}
                            />
                            <Input
                                type="number"
                                value={keyResult.currentValue}
                                placeholder="Current Value"
                                onChange={(e) => {
                                    handleChange("currentValue", parseInt(e.target.value), index);
                                }}
                            />
                            <Input
                                type="text"
                                value={keyResult.metric}
                                placeholder="Metrics Value"
                                onChange={(e) => {
                                    handleChange("metric", e.target.value, index);
                                }}
                            />
                            <Input
                                type="number"
                                value={keyResult.targetValue}
                                placeholder="Target Value"
                                onChange={(e) => {
                                    handleChange("targetValue", parseInt(e.target.value), index);
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
                    onClick={isUpdateForm ? handleUpdateObjective : addNewObjective}
                    className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md text-white text-sm font-medium flex items-center"
                >
                    {isWaitingForResponse && (
                        <LoaderCircle className="w-4 h-4 mr-1 animate-spin"/>
                    )}{" "}
                    {isUpdateForm ? "Update Objective" : `Add Objective`}
                </button>
            </div>
        </div>
    );
}
