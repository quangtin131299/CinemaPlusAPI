import { Test, TestingModule } from '@nestjs/testing';
import { PopcornController } from './popcorn.controller';

describe('PopcornController', () => {
  let controller: PopcornController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopcornController],
    }).compile();

    controller = module.get<PopcornController>(PopcornController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
