import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @UseGuards(AuthGuard)
    @Post()
    createReport(@Body() body: CreateReportsDto, @CurrentUser() user:User) {
        return this.reportsService.create(body, user);
    }
}
