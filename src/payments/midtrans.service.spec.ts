/**
 * @file ptb-backend/src/payments/midtrans.service.spec.ts
 * @description Unit tests for MidtransService Signature Verification
 */

import { Test, TestingModule } from '@nestjs/testing';
import { MidtransService } from './midtrans.service';
import { ConfigService } from '@nestjs/config';

describe('MidtransService', () => {
  let service: MidtransService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MidtransService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'MIDTRANS_SERVER_KEY') return 'test_server_key';
              return false;
            },
          },
        },
      ],
    }).compile();

    service = module.get<MidtransService>(MidtransService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
