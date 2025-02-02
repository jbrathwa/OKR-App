import {Body, Controller, Delete, Get, Patch, Post, Query} from '@nestjs/common';
import {KeyResultsService} from "./key-results.service";
import {KeyResultReqDTO, KeyResultResDTO} from "./keyResultDTO";


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
        return this.keyResultsService.create(keyResults);
    }

    @Delete('/')
    delete(@Body('id') id: string) {
        return this.keyResultsService.delete(id);
    }

    @Patch("/")
    patch(@Body() keyResults: KeyResultResDTO) {
        return this.keyResultsService.patch(keyResults);
    }
}
