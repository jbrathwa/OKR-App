import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {ObjectivesService} from "./objectives.service";
import {RequestDTO} from "./RequestDTO";

@Controller('objectives')
export class ObjectivesController {
    constructor(private readonly objectivesService: ObjectivesService) {
    }

    @Get("/")
    fetchAll() {
        return this.objectivesService.fetchAll();
    }

    @Post("/")
    create(@Body() okrs: RequestDTO) {
        return this.objectivesService.create(okrs);
    }

    @Delete("/")
    delete(@Body('objectiveId') objectiveId: string) {
        return this.objectivesService.deleteObjective(objectiveId);
    }


}
