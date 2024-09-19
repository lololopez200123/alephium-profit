import { JwtAuthGuard } from './jwt-guard.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
