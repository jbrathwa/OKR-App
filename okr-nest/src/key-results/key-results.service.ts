import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class KeyResultsService {
    constructor(private readonly prismaService: PrismaService) {}

    create(keyResults){
        return this.prismaService.keyResults.createMany({data:keyResults});
    }

    delete(keyResultId: string){
        return this.prismaService.keyResults.delete({
            where:{
                id: keyResultId
            }
        })
    }
}
