import { Test, TestingModule } from '@nestjs/testing';
import { ClassNewsController } from './class-news.controller';
import { ClassNewsService } from './class-news.service';

describe('ClassNewsController', () => {
  let controller: ClassNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassNewsController],
      providers: [ClassNewsService],
    }).compile();

    controller = module.get<ClassNewsController>(ClassNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
