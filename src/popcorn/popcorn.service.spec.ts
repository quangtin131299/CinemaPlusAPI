import { Test, TestingModule } from '@nestjs/testing';
import { PopcornService } from './popcorn.service';

describe('PopcornService', () => {
  let service: PopcornService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopcornService],
    }).compile();

    service = module.get<PopcornService>(PopcornService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
