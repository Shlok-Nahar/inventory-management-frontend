import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white py-4 px-10 border-b border-gray-200">
      <div class="flex items-center justify-center max-w-7xl mx-auto">
          <span class="font-bold text-xl">Inventory Manager</span>
      </div>
    </header>
  `
})
export class HeaderComponent {}

