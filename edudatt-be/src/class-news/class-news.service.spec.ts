import { Test, TestingModule } from '@nestjs/testing';
import { ClassNewsService } from './class-news.service';

describe('ClassNewsService', () => {
  let service: ClassNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassNewsService],
    }).compile();

    service = module.get<ClassNewsService>(ClassNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
