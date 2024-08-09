import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import(
        './calculator/views/calculator-view/calculator-view.component'
      ).then((m) => m.CalculatorViewComponent),
  },
  {
    path: '**',
    redirectTo: 'calculator',
  }
];
