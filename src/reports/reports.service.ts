import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({
      ...reportDto,
      user,
    });

    return this.repo.save(report);
  }

  async changeApproval(reportId: string, approveReportDto: ApproveReportDto, user: User) {
    const report = await this.repo.findOne({ 
      where: { id: parseInt(reportId) },
      relations: ['user'],
    });

    if(!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approveReportDto.approved;
    report.userApproved = user;

    return this.repo.save(report);
  }


  createEstimate({ make, model, lat, lng, year, mileage }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved = true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .groupBy('mileage')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
