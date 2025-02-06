import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {KeyResultReqDTO, KeyResultResDTO,} from "./keyResultDTO";

@Injectable()
export class KeyResultsService {
    constructor(private readonly prismaService: PrismaService) {
    }

    fetchUnique(keyResultId: string) {
        if (keyResultId.length == 0) return undefined;
        return this.prismaService.keyResults.findUnique({
            where: {id: keyResultId},
        }); // return the specific keyResult
    }

    create(keyResults: KeyResultReqDTO[]) {
        if (keyResults.length == 0) return undefined;
        return this.prismaService.keyResults.createManyAndReturn({data: keyResults});
    }

    delete(keyResultId: string) {
        return this.prismaService.keyResults.delete({
            where: {
                id: keyResultId
            }
        }); // return the deleted keyResult
    }

    patch(keyResults: KeyResultResDTO){
        return this.prismaService.keyResults.update({
            where: {
                id: keyResults.id
            },
            data: {
                title: keyResults.title,
                initialValue: keyResults.initialValue,
                targetValue: keyResults.targetValue,
                currentValue: keyResults.currentValue,
                metric: keyResults.metric,
            }
        })
    }
}
