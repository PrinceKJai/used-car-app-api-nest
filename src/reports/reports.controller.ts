import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @UseGuards(AuthGuard)
    @Post()
    createReport(@Body() body: CreateReportsDto) {
        console.log("bodybodybody", body);
        return this.reportsService.create(body);
    }
}
