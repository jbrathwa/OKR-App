import {keyResultCompletionService} from "./key-results-completion.service";
import {Test, TestingModule} from "@nestjs/testing";

describe("KeyResultCompletionService", () => {
    let service:keyResultCompletionService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [keyResultCompletionService],
        }).compile();
        service = module.get<keyResultCompletionService>(keyResultCompletionService);
    })

    describe("isComplete", () => {
        const keyResults = {
            objectiveId: "1",
            title: 'title',
            initialValue: 1,
            metric: "asdasd"
        }

        it("should return true if current value is equals to target value", ()=>{
            const response = service.isComplete({...keyResults, currentValue: 1, targetValue: 1});
            expect(response).toBeTruthy();
        })

        it("should return false if current value is not equals to target value", ()=>{
            const response = service.isComplete({...keyResults, currentValue: 1, targetValue: 2});
            expect(response).not.toBeTruthy();
        })

        it("should return true if current value is equals or greater than target value", ()=>{
            const response = service.isComplete({...keyResults, currentValue: 5, targetValue: 2});
            expect(response).toBeTruthy();
        })
    })
})