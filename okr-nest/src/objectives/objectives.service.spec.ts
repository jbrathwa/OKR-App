import {Test, TestingModule} from '@nestjs/testing';
import {ObjectivesService} from './objectives.service';
import {PrismaService} from "../prisma/prisma.service";
import {mockDeep} from "jest-mock-extended";

describe('ObjectivesService', () => {
    let service: ObjectivesService;
    let mockPrismaService = mockDeep<PrismaService>();
    let objective = {
        objective: "Objective 1",
        keyResults: [
            {
                id: "e957fb53-e7fe-4885-acb9-cee42fe9ef3a",
                objectiveId: "95dd1b84-c92d-41a0-ae67-3930dab3344a",
                title: "Key Result 1",
                initialValue: 0,
                currentValue: 0,
                targetValue: 0,
                metric: "%"
            }
        ]
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ObjectivesService, {
                provide: PrismaService,
                useValue: mockPrismaService
            }],
            /** Here we need to pass PrismaService Dependency even though here we mocking PrismaService.
             * */
        }).compile();

        service = module.get<ObjectivesService>(ObjectivesService);
    });

    describe("Initial", () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
            expect(mockPrismaService).toBeDefined();
        });
    })

    describe("fetchAll Objective", () => {
        it("should return all objectives", async () => {
            let mockResponse = {id: "1000", ...objective};

            mockPrismaService.objectives.findMany.mockResolvedValue([mockResponse]);

            const response = await service.fetchAll();

            expect(response).toBeDefined();
            expect(response).toEqual([mockResponse]);
        })
    })

    describe("Create Objective", () => {
        it("should create objective", async () => {
            let mockResponse = {id: "1001", objective: "Objective 1"};

            mockPrismaService.objectives.create.mockResolvedValue(mockResponse);

            const response = await service.create({objective: "Objective 1"});

            expect(response).toBeDefined();
            expect(response).toEqual(mockResponse);
        })
    })

    describe("Delete Objective", () => {
        it('should delete objective', async () => {
            let mockResponse = {id: "1001", ...objective};

            mockPrismaService.objectives.delete.mockResolvedValue(mockResponse);

            const response = await service.delete("1001");

            expect(response).toBeDefined();
            expect(response).toEqual(mockResponse);
        });
    })
});
