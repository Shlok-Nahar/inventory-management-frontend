import { Routes } from '@angular/router';
import { ProductTableComponent } from './components/products-table/products-table.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'products', component: ProductTableComponent, title: 'Products' }
];
