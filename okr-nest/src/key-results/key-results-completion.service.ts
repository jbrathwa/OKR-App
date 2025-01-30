import {KeyResultReqDTO} from "./keyResultDTO";

export class keyResultCompletionService {
    isComplete(keyResultDTO: KeyResultReqDTO) {
        return keyResultDTO.currentValue >= keyResultDTO.targetValue;
    }
}