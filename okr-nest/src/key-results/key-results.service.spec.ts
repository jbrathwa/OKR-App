import {KeyResultsService} from "./key-results.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {mockDeep} from "jest-mock-extended";
import {KeyResultReqDTO, KeyResultResDTO} from "./keyResultDTO";

describe("KeyResultService", () => {
    let keyResultsService: KeyResultsService;
    let mockPrismaService = mockDeep<PrismaService>();
    let keyResult: KeyResultReqDTO = {
        title: "Hire frontend developer",
        initialValue: 0,
        currentValue: 0,
        targetValue: 0,
        metric: "%",
        objectiveId: "1"
    }

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
        it("Should be defined", () => {
            expect(keyResultsService).toBeDefined();
        })
    })

    describe("fetchUnique()", () => {
        let keyResultId: string = "1001";

        it("Should be called findUnique() of PrismaService", async () => {
            await keyResultsService.fetchUnique(keyResultId);

            expect(mockPrismaService.keyResults.findUnique).toHaveBeenCalled();
        })

        it("Should return of unique key results of given id", async () => {
            // arrange
            const mockedResponse = {id: keyResultId, ...keyResult};
            mockPrismaService.keyResults.findUnique.mockResolvedValue(mockedResponse);

            // act
            const response = await keyResultsService.fetchUnique(keyResultId);

            // assert
            expect(response).toBeDefined();
            expect(response).toEqual(mockedResponse);
        })
    })

    describe("create()", () => {
        let keyResults: KeyResultReqDTO[] = [keyResult];

        it("Should be called create() of PrismaService", async () => {
            await keyResultsService.create(keyResults);

            expect(mockPrismaService.keyResults.createMany).toHaveBeenCalled();
        })

        it("Should create key results", async () => {
            mockPrismaService.keyResults.createMany.mockResolvedValue({count: 1});

            const response = await keyResultsService.create(keyResults);

            expect(response).toBeDefined();
            expect(response?.count).toBe(keyResults.length);
        })
    })

    describe("delete()", () => {
        let keyResultId: string = "1002";

        it("Should be called delete() of PrismaService", async () => {
            await keyResultsService.delete(keyResultId);

            expect(mockPrismaService.keyResults.delete).toHaveBeenCalled();
        })

        it("Should delete key results", async () => {
            const mockedResponse = {id: keyResultId, ...keyResult};
            mockPrismaService.keyResults.delete.mockResolvedValue(mockedResponse);

            const response = await keyResultsService.delete(keyResultId);

            expect(response).toBeDefined();
            expect(response).toEqual(mockedResponse);
        })
    })
})