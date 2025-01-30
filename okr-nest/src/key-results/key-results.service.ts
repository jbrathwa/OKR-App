import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {KeyResultReqDTO} from "./keyResultDTO";

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
        return this.prismaService.keyResults.createMany({data: keyResults}); // return the {count: no_of_inserted_record}
    }

    delete(keyResultId: string) {
        return this.prismaService.keyResults.delete({
            where: {
                id: keyResultId
            }
        }); // return the deleted keyResult
    }
}
