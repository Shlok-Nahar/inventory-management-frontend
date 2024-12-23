import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavbarComponent],
  template: `
    <div class="min-h-screen bg-[#FFFFFF]">
      <app-header />
      <app-navbar />
      <router-outlet />
    </div>
  `
})
export class AppComponent {
  title = 'inventory-management-frontend';
}