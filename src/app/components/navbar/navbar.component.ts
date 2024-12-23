import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
      <nav class="bg-white border-b border-gray-200 flex items-center justify-center h-16">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex gap-8 text-sm text-gray-700 hover:text-black">
            <a routerLink="/home" 
              routerLinkActive="border-b-2 border-black">
              Home
            </a>
            <a routerLink="/products" 
              routerLinkActive="border-b-2 border-black">
              Products
            </a>
            <a routerLink="/suppliers" 
              routerLinkActive="border-b-2 border-black" >
              Suppliers
            </a>
            <a routerLink="/customers" 
              routerLinkActive="border-b-2 border-black" >
              Customers
            </a>
            <a routerLink="/transactions" 
              routerLinkActive="border-b-2 border-black" >
              Transactions
            </a>
          </div>
        </div>
      </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}
