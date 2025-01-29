import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ObjectivesService {
    constructor(private readonly prismaService: PrismaService) {
    }


    async fetchAll() {
        return await this.prismaService.objectives.findMany({
            include: {
                keyResults: true,
            }
        });
    }

    async create(okrs: { objective: string }) {
        return await this.prismaService.objectives.create({data: okrs});
    }

    async deleteObjective(objectiveId: string) {
        try {
            return await this.prismaService.objectives.delete({where: {id: objectiveId}});
        } catch (error) {
            return error;
        }
    }
}
