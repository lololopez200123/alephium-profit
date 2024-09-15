import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import * as xlsx from 'xlsx';
import { CandidatesService, CandidateWithFile } from './candidates.service';
import { Candidate } from './schemas/candidate.schema';
import { BadRequestException } from '@nestjs/common';

jest.mock('xlsx');

describe('CandidatesService', () => {
  let service: CandidatesService;
  let mockCandidateModel: any;

  beforeEach(async () => {
    mockCandidateModel = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: getModelToken(Candidate.name),
          useValue: mockCandidateModel,
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new candidate', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const mockXlsxData = [
        {
          Seniority: 'senior',
          'Years of experience': 5,
          Availability: true,
        },
      ];

      (xlsx.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: {},
        },
      });

      (xlsx.utils.sheet_to_json as jest.Mock).mockReturnValue(mockXlsxData);

      const candidateDto: CandidateWithFile = {
        name: 'John',
        surname: 'Doe',
        file: mockFile,
      };

      const expectedCandidate = {
        name: 'John',
        surname: 'Doe',
        seniority: 'senior',
        years: 5,
        availability: true,
      };

      mockCandidateModel.mockImplementation(() => ({
        ...expectedCandidate,
        save: jest.fn().mockResolvedValue(expectedCandidate),
      }));

      const result = await service.create(candidateDto);

      expect(xlsx.read).toHaveBeenCalledWith(mockFile.buffer, {
        type: 'buffer',
      });
      expect(xlsx.utils.sheet_to_json).toHaveBeenCalled();
      expect(mockCandidateModel).toHaveBeenCalledWith(expectedCandidate);
      expect(result).toEqual(expectedCandidate);
    });

    it('should throw BadRequestException for invalid Excel format', async () => {
      const mockFile = {
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      (xlsx.read as jest.Mock).mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: {},
        },
      });

      (xlsx.utils.sheet_to_json as jest.Mock).mockReturnValue([{}]);

      const candidateDto: CandidateWithFile = {
        name: 'John',
        surname: 'Doe',
        file: mockFile,
      };

      await expect(service.create(candidateDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAll', () => {
    it('should return an array of all candidates', async () => {
      const mockCandidates = [
        {
          name: 'John',
          surname: 'Doe',
          seniority: 'senior',
          years: 5,
          availability: true,
        },
        {
          name: 'Jane',
          surname: 'Doe',
          seniority: 'junior',
          years: 2,
          availability: false,
        },
      ];

      mockCandidateModel.find = jest.fn().mockReturnThis();
      mockCandidateModel.exec = jest.fn().mockResolvedValue(mockCandidates);

      const result = await service.getAll();

      expect(mockCandidateModel.find).toHaveBeenCalled();
      expect(mockCandidateModel.exec).toHaveBeenCalled();
      expect(result).toEqual(mockCandidates);
      expect(result.length).toBe(2);
    });

    it('should return an empty array if no candidates are found', async () => {
      mockCandidateModel.find = jest.fn().mockReturnThis();
      mockCandidateModel.exec = jest.fn().mockResolvedValue([]);

      const result = await service.getAll();

      expect(mockCandidateModel.find).toHaveBeenCalled();
      expect(mockCandidateModel.exec).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should throw an error if the database query fails', async () => {
      const errorMessage = 'Database query failed';
      mockCandidateModel.find = jest.fn().mockReturnThis();
      mockCandidateModel.exec = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.getAll()).rejects.toThrow(errorMessage);
      expect(mockCandidateModel.find).toHaveBeenCalled();
      expect(mockCandidateModel.exec).toHaveBeenCalled();
    });
  });
});
