import {Module} from '@nestjs/common';
import {ObjectivesController} from './objectives.controller';
import {ObjectivesService} from './objectives.service';
import {DatabaseService} from "../database/database.service";

@Module({
    controllers: [ObjectivesController],
    providers: [ObjectivesService, DatabaseService]
})
export class ObjectivesModule {
}
