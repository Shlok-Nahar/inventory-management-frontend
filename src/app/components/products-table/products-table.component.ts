import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-products-table',
  template: `
    <div class="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] group/design-root overflow-x-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="px-4 py-3 @container">
              <div class="flex overflow-hidden rounded-xl border border-[#E9DFCE] bg-[#FFFFFF]">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-[#FFFFFF]">
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">ProductID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Name</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Stock</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">CustomerID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">SupplierID</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (product of products(); track product.productId) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{product.productId}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{product.name}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#A18249] text-sm">{{product.stock}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{product.customerId}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{product.supplierId}}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class ProductTableComponent {
  products = signal<Product[]>([
    { productId: 101, name: 'Laptop', stock: 25, customerId: 'C123', supplierId: 'S456' },
    { productId: 102, name: 'Monitor', stock: 50, customerId: '', supplierId: 'S012' },
    { productId: 103, name: 'Keyboard', stock: 100, customerId: 'C345', supplierId: 'S678' },
    { productId: 104, name: 'Mouse', stock: 75, customerId: 'C901', supplierId: '' },
    { productId: 105, name: 'Printer', stock: 30, customerId: 'C567', supplierId: 'S890' }
  ]);
}
