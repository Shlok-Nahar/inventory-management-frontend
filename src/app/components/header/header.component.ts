import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white py-4 px-10 border-b border-gray-200">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <div class="flex items-center gap-8">
          <span class="font-bold text-xl">Inventory Manager</span>
        </div>
        
         
        <div class="flex items-center gap-8">
          <div class="relative">
            <input 
              type="search" 
              placeholder="Search" 
              class="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 w-[300px]"
            >
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}
