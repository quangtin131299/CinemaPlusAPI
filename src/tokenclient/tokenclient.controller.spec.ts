import { Test, TestingModule } from '@nestjs/testing';
import { TokenclientController } from './tokenclient.controller';

describe('TokenclientController', () => {
  let controller: TokenclientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenclientController],
    }).compile();

    controller = module.get<TokenclientController>(TokenclientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
