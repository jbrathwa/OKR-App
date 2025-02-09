import {Module} from '@nestjs/common';
import {HelloWorldModule} from './hello-world/hello-world.module';
import {ObjectivesModule} from './objectives/objectives.module';
import {DatabaseModule} from './database/database.module';
import { PrismaService } from './prisma/prisma.service';
import { KeyResultsModule } from './key-results/key-results.module';
import { RagModule } from './rag/rag.module';

@Module({
    imports: [HelloWorldModule, ObjectivesModule, DatabaseModule, KeyResultsModule, RagModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {
}
