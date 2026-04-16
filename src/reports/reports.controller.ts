import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @UseGuards(AuthGuard)
    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportsDto, @CurrentUser() user:User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.approveReport(id, body.approved);
    }

    @Get('/:id')
    getReportByReportId(@Param('id') id: string) {
        return this.reportsService.getReportByReportId(id);
    }

    @Get('/user/:userId')
    getReportsByUserId(@Param('userId') userId: string) {
        return this.reportsService.getReportsByUserId(userId);
    }
}
