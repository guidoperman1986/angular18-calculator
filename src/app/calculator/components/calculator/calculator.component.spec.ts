import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from '../../services/calculator.service';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let compiled: HTMLElement;
  let fixture: ComponentFixture<CalculatorComponent>;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
    /* fixture.detectChanges(); */
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toContain('456 *');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content-projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);
  });

  it('should have 19 calculator-button with content-projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toContain('C');
    expect(buttons[1].textContent?.trim()).toContain('+/-');
    expect(buttons[2].textContent?.trim()).toContain('%');
    expect(buttons[3].textContent?.trim()).toContain('÷');
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    fixture.detectChanges();
    
    expect(component.resultText()).toBe('123');
  });
  
  it('should display sub-result correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
  });
});
