import { Test, TestingModule } from '@nestjs/testing';
import { RepotCardService } from './repot-card.service';

describe('RepotCardService', () => {
  let service: RepotCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepotCardService],
    }).compile();

    service = module.get<RepotCardService>(RepotCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
