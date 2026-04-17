import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }

    @UseGuards(AuthGuard)
    @Post()
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportsDto, @CurrentUser() user:User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
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
