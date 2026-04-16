import { Injectable, NotFoundException } from '@nestjs/common';
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

    async approveReport(id: string, approved: boolean) {
        const report = await this.reportsRepo.findOne({ where: { id: parseInt(id) } });
        if(!report) {
            throw new NotFoundException("Report not found!")
        }
        report.approved = approved;
        return this.reportsRepo.save(report);
    }

    async getReportByReportId(id: string) {
        const report = await this.reportsRepo.findOne({ where: { id: parseInt(id) } });
        if(!report) {
            throw new NotFoundException("No report found for the given user")
        }
        return report;
    }

    async getReportsByUserId(userId: string) {
        const reports = await this.reportsRepo.find({ where: { id: parseInt(userId) } });
        if(!reports) {
            throw new NotFoundException("No report found for the given user")
        }
        return reports;
    }
}
