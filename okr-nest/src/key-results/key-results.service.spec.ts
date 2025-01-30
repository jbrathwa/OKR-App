import {KeyResultsService} from "./key-results.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {anyArray, mockDeep} from "jest-mock-extended";
import {KeyResultReqDTO, KeyResultResDTO} from "./keyResultDTO";

describe("KeyResultService", () => {
    let keyResultsService: KeyResultsService;
    let mockPrismaService = mockDeep<PrismaService>();

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [KeyResultsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService
                }],
        }).compile();

        keyResultsService = module.get<KeyResultsService>(KeyResultsService);
    })

    describe("fetchUnique KeyResult", () => {
        let keyResult: KeyResultReqDTO;

        beforeEach(async () => {
            keyResult = {
                title: "Hire frontend developer",
                initialValue: 0,
                currentValue: 0,
                targetValue: 0,
                metric: "%",
                objectiveId: "1objective"
            }
        })

        it("Should return an array of unique key results", async () => {
            // arrange
            mockPrismaService.keyResults.findUnique.mockResolvedValue({id: "12b", ...keyResult});

            // act
            const response = await keyResultsService.fetchUnique("12b");

            // assert
            expect(response).toBeDefined();
            expect(response).toEqual({...keyResult, id: "12b"});
        })

        it("Should create key results", async () => {
            const keyResults: KeyResultReqDTO[] = [keyResult]

            mockPrismaService.keyResults.createMany.mockResolvedValue({count: 1});

            const response = await keyResultsService.create(keyResults);

            expect(response).toBeDefined();
            expect(response?.count).toBe(keyResults.length);
        })

        // it("Should delete key results", async () => {
        //     const keyResults: KeyResultReqDTO[] = [keyResult]
        //
        //     mockPrismaService.keyResults.createMany.mockResolvedValue({count: 1});
        //
        //     const response = await keyResultsService.create(keyResults);
        //
        //     expect(response).toBeDefined();
        //     expect(response?.count).toBe(keyResults.length);
        // })
    })
})