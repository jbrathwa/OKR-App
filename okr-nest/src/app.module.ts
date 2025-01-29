import {Module} from '@nestjs/common';
import {HelloWorldModule} from './hello-world/hello-world.module';
import {ObjectivesModule} from './objectives/objectives.module';
import {DatabaseModule} from './database/database.module';
import { PrismaService } from './prisma/prisma.service';
import { KeyResultsModule } from './key-results/key-results.module';

@Module({
    imports: [HelloWorldModule, ObjectivesModule, DatabaseModule, KeyResultsModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {
}
