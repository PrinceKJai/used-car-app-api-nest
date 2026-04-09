import { Injectable } from '@nestjs/common';
import { CreateReportsDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportsRepo: Repository<Report>) {}

    async create(body: CreateReportsDto) {
        const report = this.reportsRepo.create(body);
        await this.reportsRepo.save(report);
        return report;
        // const data = JSON.stringify(body);
        // return `${data} data received`;
    }
}
