import {KeyResultsService} from "./key-results.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {mockDeep} from "jest-mock-extended";
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

    describe("Initial", () => {
        it("should be defined", () => {
            expect(keyResultsService).toBeDefined();
        })
    })

    describe("fetchUnique KeyResult()", () => {
        let keyResult: KeyResultReqDTO = {
            title: "Hire frontend developer",
            initialValue: 0,
            currentValue: 0,
            targetValue: 0,
            metric: "%",
            objectiveId: "1"
        }

        it("Should return an array of unique key results", async () => {
            // arrange
            const mockedResponse = {id: "1001", ...keyResult};
            mockPrismaService.keyResults.findUnique.mockResolvedValue(mockedResponse);

            // act
            const response = await keyResultsService.fetchUnique("1001");

            // assert
            expect(response).toBeDefined();
            expect(response).toEqual(mockedResponse);
        })

        it("Should create key results", async () => {
            const keyResults: KeyResultReqDTO[] = [keyResult]

            mockPrismaService.keyResults.createMany.mockResolvedValue({count: 1});

            const response = await keyResultsService.create(keyResults);

            expect(response).toBeDefined();
            expect(response?.count).toBe(keyResults.length);
        })

        it("Should delete key results", async () => {
            const mockedResponse = {id: "1002", ...keyResult};
            mockPrismaService.keyResults.delete.mockResolvedValue(mockedResponse);

            const response = await keyResultsService.delete("1002");

            expect(response).toBeDefined();
            expect(response).toEqual(mockedResponse);
        })
    })
})