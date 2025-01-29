import { Module } from '@nestjs/common';
import { KeyResultsController } from './key-results.controller';
import { KeyResultsService } from './key-results.service';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [KeyResultsController],
  providers: [KeyResultsService, PrismaService],
})
export class KeyResultsModule {}
