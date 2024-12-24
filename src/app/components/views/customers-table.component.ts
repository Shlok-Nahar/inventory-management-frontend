import { Component, signal } from '@angular/core';
import { Customer } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-table',
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
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">CustomerID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Name</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (customer of customers(); track customer.customerID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{customer.customerID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{customer.customerName}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{customer.contactInfo}}</td>
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

export class CustomerTableComponent {
  customers = signal<Customer[]>([]);

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers.set(data),
      error: (error) => console.error('Error fetching customers:', error)
    });
  }
}
