import { Injectable } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepo: Repository<Report>) {}

    async create(body: CreateReportsDto, user: User) {
        const report = this.reportsRepo.create(body);
        report.user = user;
        await this.reportsRepo.save(report);
        return report;
    }
}
