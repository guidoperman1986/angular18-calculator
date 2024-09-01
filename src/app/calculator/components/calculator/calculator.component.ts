import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  calculatorButtons = viewChildren(CalculatorButtonComponent);
  private calculatorService = inject(CalculatorService);
  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  /* get resultText() {
    return this.calculatorService.resultText();
  } */

  handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      '-': '-',
      '+': '+',
      Enter: '=',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    
    console.log(keyValue);
    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button) => {
      button.keyboarPresedStyle(keyValue);
    });
  }
}
