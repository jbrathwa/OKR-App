import {useContext, useState} from "react";
import {
    InsertKeyResultType,
    KeyResultModalType,
} from "../types/OKRTypes";
import Input from "./Input";
import {CircleX} from "lucide-react";
import {OkrContext} from "../context/OkrProvider";
import {addKeyResultToObjective} from "../database/OKRStore.ts";

const defaultKeyResults:InsertKeyResultType = {
    title: "",
    initialValue: 0,
    currentValue: 0,
    targetValue: 0,
    metric: "",
};

export default function AddKeyResultModal({
                                              closeModal,
                                              keyResultModal,
                                          }: {
    closeModal: () => void;
    keyResultModal: KeyResultModalType;
}) {
    const {objectives, setObjectives} = useContext(OkrContext)

    const [keyResult, setKeyResult] = useState<InsertKeyResultType>(defaultKeyResults);

    function handleAddKeyResult() {
        if (objectives === null) return;

        console.log(keyResult);

        const foundObj = objectives.find(
            (_, idx) => keyResultModal.objectiveIndex === idx
        );

        if (foundObj === undefined) return;
        addKeyResultToObjective(keyResult, foundObj.id).then((data) => {
            foundObj.keyResults.push({...keyResult, id: data.id});

            const updatedObjectives = objectives.map((objective, idx) => {
                return idx === keyResultModal.objectiveIndex ? foundObj : objective;
            });
            setObjectives(updatedObjectives);
            closeModal();
        }).catch((error) => {
            console.log(error)
        })
    }

    function handleChange(key: string, value: number | string) {
        const updatedKeyResult: InsertKeyResultType = {...keyResult, [key]: value};
        setKeyResult(updatedKeyResult);
    }

    return (
        <div className="inset-0 fixed bg-gray-500 flex bg-opacity-50 justify-center items-center">
            <div
                id="firstKeyResult"
                className="bg-white relative border-3 rounded-md p-10 w-1/2 flex flex-col space-y-2"
            >
                <div className="w-full flex justify-between mb-3">
                    <h1 className="text-blue-500 font-medium">{objectives != null && objectives[keyResultModal.objectiveIndex].objective}</h1>
                    <button
                        onClick={closeModal}
                        className="text-red-500"
                    >
                        <CircleX className="w-5 h-5"/>
                    </button>
                </div>
                <Input
                    value={keyResult.title}
                    className="flex-grow"
                    type="text"
                    placeholder="Key Result Title 1"
                    onChange={(e) => {
                        handleChange("title", e.target.value);
                    }}
                />
                <div
                    id="firstKeyResultMetrics"
                    className="flex justify-between flex-wrap gap-2"
                >
                    <Input
                        value={keyResult.initialValue}
                        type="number"
                        placeholder="Initial Value"
                        onChange={(e) => {
                            handleChange("initialValue", parseInt(e.target.value));
                        }}
                    />
                    <Input
                        value={keyResult.currentValue}
                        type="number"
                        placeholder="Current Value"
                        onChange={(e) => {
                            handleChange("currentValue", parseInt(e.target.value));
                        }}
                    />
                    <Input
                        value={keyResult.targetValue}
                        type="number"
                        placeholder="Target Value"
                        onChange={(e) => {
                            handleChange("targetValue", parseInt(e.target.value));
                        }}
                    />
                    <Input
                        value={keyResult.metric}
                        type="text"
                        placeholder="Metrics Value"
                        onChange={(e) => {
                            handleChange("metric", e.target.value);
                        }}
                    />
                    <button
                        onClick={() => handleAddKeyResult()}
                        className="bg-blue-400 hover:bg-blue-500  px-4 py-2 rounded-md text-white text-sm font-medium"
                    >
                        Add key Result
                    </button>
                </div>
            </div>
        </div>
    );
}
