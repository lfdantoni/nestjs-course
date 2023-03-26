import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() currentUser: User) {
    return this.reportsService.create(body, currentUser);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, AdminGuard)
  @Serialize(ReportDto)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto, @CurrentUser() currentUser: User) {
    return this.reportsService.changeApproval(id, body, currentUser);
  }

  @Get()
  @UseGuards(AuthGuard)
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
    return this.reportsService.createEstimate(query);
    // return this.reportsService.getEstimate();
  }
}
