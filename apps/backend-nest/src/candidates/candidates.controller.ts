import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CandidatesService } from './candidates.service';
import { Candidate } from './schemas/candidate.schema';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCandidateDto: CreateCandidateDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.candidatesService.create({ ...createCandidateDto, file });
  }

  @Get()
  findAll(): Promise<Candidate[]> {
    return this.candidatesService.getAll();
  }
}
