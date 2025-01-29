import {Body, Controller, Delete, Post} from '@nestjs/common';
import {KeyResultsService} from "./key-results.service";

class KeyResultDTO {
    title: string
    initialValue: number
    currentValue: number
    targetValue: string
    metric: string
    objectiveId: string
}

@Controller('key-results')
export class KeyResultsController {

    constructor(private readonly keyResultsService: KeyResultsService) {}

    @Post("/")
    create(@Body() keyResults: KeyResultDTO[]) {
        console.log({keyResults})
        return this.keyResultsService.create(keyResults);
    }

    @Delete('/')
    delete(@Body('id') id: string) {
        return this.keyResultsService.delete(id);
    }
}
