import {Injectable} from '@nestjs/common';
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
        return await this.prismaService.objectives.create({
            data: okrs
        });
    }

    async delete(objectiveId: string) {
        try {
            return await this.prismaService.objectives.delete({where: {id: objectiveId}});
        } catch (error) {
            return error;
        }
    }

    async patch(okrs: { objective: string, id: string }) {
        return await this.prismaService.objectives.update({
            where: {id: okrs.id},
            data: {objective: okrs.objective}
        });
    }
}
