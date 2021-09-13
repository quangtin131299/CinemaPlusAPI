import { Test, TestingModule } from '@nestjs/testing';
import { AuthencationService } from './authencation.service';

describe('AuthencationService', () => {
  let service: AuthencationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthencationService],
    }).compile();

    service = module.get<AuthencationService>(AuthencationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
