import {Body, Controller, Get, Post} from '@nestjs/common';
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
}
