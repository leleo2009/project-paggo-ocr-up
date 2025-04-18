import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    const mockJwtService = {
      verify: jest.fn().mockReturnValue({ userId: 1, email: 'test@example.com' }),
    };

    guard = new AuthGuard(mockJwtService as unknown as JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
