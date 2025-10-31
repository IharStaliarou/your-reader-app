import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsOptions = (configService: ConfigService): CorsOptions => {
  return {
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      configService.get('FRONTEND_URL'),
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };
};
