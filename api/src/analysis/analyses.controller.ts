import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnalysesService } from './analyses.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

@Controller('analysis')
export class AnalysesController {
  constructor(private readonly analysesService: AnalysesService) {}

  @Post()
  create(@Body() dto: CreateAnalysisDto) {
    return this.analysesService.create(dto);
  }

  @Get()
  findAll() {
    return this.analysesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analysesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analysesService.remove(id);
  }
}
