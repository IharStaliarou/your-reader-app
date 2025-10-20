import { User } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface VerificationPayload {
  userId: string;
  email: string;
}

@Injectable()
export class VerificationTokenService {
  private readonly logger = new Logger(VerificationTokenService.name);
  private readonly secret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get<string>('JWT_VERIFICATION_SECRET');
  }

  generateVerificationToken(user: User): string {
    if (!this.secret) {
      this.logger.error('JWT_VERIFICATION_SECRET is not configured!');
      throw new Error('Verification secret not set');
    }

    const payload: VerificationPayload = {
      userId: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: '1h',
    });
  }

  verifyVerificationToken(token: string): VerificationPayload {
    try {
      return this.jwtService.verify<VerificationPayload>(token, {
        secret: this.secret,
      });
    } catch (error) {
      this.logger.warn('Invalid verification token', error.message);
      throw new Error('Verification link expired or invalid.');
    }
  }
}
