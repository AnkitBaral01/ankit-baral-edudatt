import { Test, TestingModule } from '@nestjs/testing';
import { RepotCardController } from './repot-card.controller';
import { RepotCardService } from './repot-card.service';

describe('RepotCardController', () => {
  let controller: RepotCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepotCardController],
      providers: [RepotCardService],
    }).compile();

    controller = module.get<RepotCardController>(RepotCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
