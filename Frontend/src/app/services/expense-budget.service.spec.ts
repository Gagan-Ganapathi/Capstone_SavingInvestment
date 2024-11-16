import { TestBed } from '@angular/core/testing';

import { ExpeneBudgetService } from './expense-budget.service';

describe('ExpeneBudgetService', () => {
  let service: ExpeneBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpeneBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
