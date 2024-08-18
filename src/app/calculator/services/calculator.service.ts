import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal<string>('10');
  public subResultText = signal<string>('20');
  public lastOperator = signal<string>('+');

  public constructNumber(value: string) {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input');
    }

    if (value === '=') {
      this.calculateResult();

      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //Backspace
    if ((value = 'Backspace')) {
      if (this.resultText() === '0') return;

      if (this.resultText().length === 2 && this.resultText().includes('-')) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
      }
      /* if (this.resultText().length > 1) {
      } */

      this.resultText.update((v) => v.slice(0, -1));

      return;
    }

    //Aplicar operador
    if (operators.includes(value)) {
      this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar nro de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    //Validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((text) => text + '.');
      return;
    }

    //Manejo del cero inicial
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    //Manejo de signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((text) => text.slice(1));
        return;
      }
      this.resultText.update((text) => '-' + text);
      return;
    }

    //Numeros
    if (numbers.includes(value)) {
      if (this.resultText() === '0' || this.resultText() === '-0') {
        if (this.resultText().includes('-')) {
          return;
        }

        this.resultText.set(value);
        return;
      }

      this.resultText.update((text) => text + value);
      return;
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;

      default:
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }
}
