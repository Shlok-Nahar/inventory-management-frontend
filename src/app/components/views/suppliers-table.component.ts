import { Component, signal } from '@angular/core';
import { Supplier } from '../../models/supplier.interface';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-suppliers-table',
  template: `
    <div class="relative flex h-screen flex-col bg-[#FFFFFF] group/design-root overflow-hidden">
      <div class="layout-container flex h-full grow flex-col">
        <div class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="px-4 py-3 @container">
              <div class="flex overflow-hidden rounded-xl border border-[#E9DFCE] bg-[#FFFFFF]">
                <table class="flex-1">
                  <thead>
                    <tr class="bg-[#FFFFFF]">
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">SupplierID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Name</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (supplier of suppliers(); track supplier.supplierID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.supplierID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.supplierName}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.contactInfo}}</td>
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

export class SupplierTableComponent {
  suppliers = signal<Supplier[]>([]);

  constructor(private readonly supplierService: SupplierService) {}

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers.set(data),
      error: (error) => console.error('Error fetching suppliers:', error)
    });
  }
}
