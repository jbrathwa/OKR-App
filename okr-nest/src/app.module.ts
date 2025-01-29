import {Module} from '@nestjs/common';
import {HelloWorldModule} from './hello-world/hello-world.module';
import {ObjectivesModule} from './objectives/objectives.module';
import {DatabaseModule} from './database/database.module';

@Module({
    imports: [HelloWorldModule, ObjectivesModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
