import {Controller, Get, Query} from '@nestjs/common';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Get("/")
  get(@Query("objective") objective: string){
    return this.ragService.get(objective);
  }
}
