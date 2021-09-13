import { Test, TestingModule } from '@nestjs/testing';
import { TokenclientService } from './tokenclient.service';

describe('TokenclientService', () => {
  let service: TokenclientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenclientService],
    }).compile();

    service = module.get<TokenclientService>(TokenclientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
