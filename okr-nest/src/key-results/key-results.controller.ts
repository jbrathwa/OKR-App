import {Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {KeyResultsService} from "./key-results.service";
import {KeyResultReqDTO} from "./keyResultDTO";


@Controller('key-results')
export class KeyResultsController {

    constructor(private readonly keyResultsService: KeyResultsService) {
    }

    @Get()
    fetchUnique(@Query("keyResultId") keyResultId: string) {
        return this.keyResultsService.fetchUnique(keyResultId);
    }

    @Post("/")
    create(@Body() keyResults: KeyResultReqDTO[]) {
        console.log({keyResults})
        return this.keyResultsService.create(keyResults);
    }

    @Delete('/')
    delete(@Body('id') id: string) {
        return this.keyResultsService.delete(id);
    }
}
