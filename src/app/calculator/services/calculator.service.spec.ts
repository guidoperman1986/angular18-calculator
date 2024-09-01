import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with equal values', () => {
    expect(service.resultText()).toEqual('0');
    expect(service.subResultText()).toEqual('0');
    expect(service.lastOperator()).toEqual('+');
  });

  it('should set resultText, subResultText to 0 when C is pressed', () => {
    service.resultText.set('10');
    service.subResultText.set('20');
    service.lastOperator.set('*');

    service.constructNumber('C');
    expect(service.resultText()).toEqual('0');
  });

  it('should update resultText when a number is pressed', () => {
    service.constructNumber('1');
    expect(service.resultText()).toEqual('1');

    service.constructNumber('2');
    expect(service.resultText()).toEqual('12');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toEqual('+');
  });

  it('should calculate the result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toEqual('3');
  });

  it('should calculate the result correctly for substraction', () => {
    service.constructNumber('6');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toEqual('4');
  });

  it('should calculate the result correctly for multiplication', () => {
    service.constructNumber('6');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toEqual('12');
  });

  it('should calculate the result correctly for division', () => {
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toEqual('5');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('1');
    service.constructNumber('.');
    service.constructNumber('2');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toEqual('3.2');
  });

  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toEqual('0.0');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect(service.resultText()).toEqual('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toEqual('1');
  });

  it('should handle backspace correctly', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toEqual('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toEqual('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toEqual('0');
  });

  it('should not accept more than 10 characters', () => {
    for (let i = 0; i < 10; i++) {
      service.constructNumber('1');
    }

    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });
});
