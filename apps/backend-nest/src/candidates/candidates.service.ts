import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as xlsx from 'xlsx';
import { Candidate } from './schemas/candidate.schema';
import { CreateCandidateDto } from './dto/create-candidate.dto';

export type CandidateWithFile = CreateCandidateDto & {
  file: Express.Multer.File;
};

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<Candidate>,
  ) {}

  async create(createCandidateDto: CandidateWithFile): Promise<Candidate> {
    try {
      const { name, surname, file } = createCandidateDto;

      if (!file || !file.buffer) {
        throw new BadRequestException('File is missing or invalid');
      }

      const workbook = xlsx.read(file.buffer, { type: 'buffer' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json: unknown[] = xlsx.utils.sheet_to_json(sheet);

      if (json.length === 0) {
        throw new BadRequestException('Excel sheet is empty');
      }

      if (
        !json[0] ||
        typeof json[0] !== 'object' ||
        !('Seniority' in json[0]) ||
        !('Years of experience' in json[0]) ||
        !('Availability' in json[0])
      ) {
        throw new BadRequestException(
          'The Excel file does not have the expected format.',
        );
      }

      const row = xlsx.utils.sheet_to_json(sheet)[0] as {
        Seniority: string;
        'Years of experience': number;
        Availability: boolean;
      };

      const seniority = row.Seniority;
      const years = Number(row['Years of experience']);
      const availability = Boolean(row.Availability);

      if (typeof seniority !== 'string' || seniority.trim() === '') {
        throw new BadRequestException('Seniority must be a non-empty string');
      }

      if (typeof years !== 'number' || years < 0) {
        throw new BadRequestException(
          'Years of experience must be a non-negative number',
        );
      }

      if (typeof availability !== 'boolean') {
        throw new BadRequestException('Availability must be a boolean value');
      }

      const createdCandidate = new this.candidateModel({
        name,
        surname,
        seniority,
        years,
        availability,
      });

      return createdCandidate.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Log the error for debugging purposes
      console.error('Error in create method:', error);
      throw new InternalServerErrorException(
        `Error processing the candidate data: ${error.message}`,
      );
    }
  }

  async getAll(): Promise<Candidate[]> {
    try {
      const data = await this.candidateModel.find().exec();
      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error get all candidates: ${error.message}`,
      );
    }
  }
}
