import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="header"> {{title()}} </div>
  `,
  styles: `
  .header{
    background-color: #333;
    color: #fff;
    padding: 10px;
  }
  `
})
export class HeaderComponent {
  title = signal('inventory-management-frontend');
}
