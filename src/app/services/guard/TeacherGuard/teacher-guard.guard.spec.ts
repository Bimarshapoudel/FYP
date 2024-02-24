import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teacherGuardGuard } from './teacher-guard.guard';

describe('teacherGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
