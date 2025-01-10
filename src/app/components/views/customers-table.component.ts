import { Component, signal } from '@angular/core';
import { Customer } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { EditCustomerModalComponent } from '../modals/edit-customer-modal.component';
import { DeleteConfirmationDialogComponent } from '../modals/delete-customer-confirmation-dialog.component';
import { CreateCustomerModalComponent } from '../modals/create-customer-modal.component';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    CommonModule, 
    EditCustomerModalComponent, 
    DeleteConfirmationDialogComponent,
    CreateCustomerModalComponent
  ],
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
                      <th class="px-4 py-3 text-center text-[#1C160C] w-[400px] text-sm font-medium">CustomerID</th>
                      <th class="px-4 py-3 text-center text-[#1C160C] w-[400px] text-sm font-medium">Name</th>
                      <th class="px-4 py-3 text-center text-[#1C160C] w-[400px] text-sm font-medium">Contact</th>
                      <th class="px-4 py-3 text-center text-[#1C160C] w-[400px] text-sm font-medium">
                        <div class="flex justify-center gap-2">
                          <button 
                            class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded"
                            (click)="toggleManageMode()">
                            {{ isManageMode() ? 'Done' : 'Manage Customers' }}
                          </button>
                          @if (isManageMode()) {
                            <button 
                              class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded inline-flex items-center"
                              (click)="openCreateModal()">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </button>
                          }
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (customer of customers(); track customer.customerID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm text-center">{{customer.customerID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm text-center">{{customer.customerName}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm text-center">{{customer.contactInfo}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm text-center">
                          @if (isManageMode()) {
                            <button 
                              class="inline-flex items-center gap-2 bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded mr-2"
                              (click)="editCustomer(customer)">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                            
                            <button 
                              class="inline-flex items-center gap-2 bg-[#E9DFCE] hover:bg-[#E34234] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded ml-2"
                              (click)="deleteCustomer(customer)">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                          }
                        </td>
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

    @if (selectedCustomer()) {
      <app-edit-customer-modal
        [customer]="selectedCustomer()!"
        (save)="saveCustomer($event)"
        (cancel)="closeModal()"
      />
    }

    @if (customerToDelete()) {
      <app-delete-customer-confirmation-dialog
        [customer]="customerToDelete()!"
        (confirm)="confirmDelete()"
        (cancel)="cancelDelete()"
      />
    }

    @if (showCreateModal()) {
      <app-create-customer-modal
        (save)="saveNewCustomer($event)"
        (cancel)="closeCreateModal()"
      />
    }
  `
})

export class CustomerTableComponent {
  customers = signal<Customer[]>([]);
  isManageMode = signal<boolean>(false);
  selectedCustomer = signal<Customer | null>(null);
  customerToDelete = signal<Customer | null>(null);
  showCreateModal = signal<boolean>(false);

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers.set(data),
      error: (error) => console.error('Error fetching customers:', error)
    });
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer.set(customer);
  }

  closeModal() {
    this.selectedCustomer.set(null);
  }

  saveCustomer(customer: Customer) {
    this.customerService.updateCustomer(customer.customerID, customer).subscribe({
      next: () => {
        this.loadCustomers();
        this.closeModal();
        console.log('Customer updated successfully');
      },
      error: (error) => console.error('Error updating customer:', error)
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerToDelete.set(customer);
  }

  cancelDelete() {
    this.customerToDelete.set(null);
  }

  confirmDelete() {
    if (this.customerToDelete()) {
      this.customerService.deleteCustomer(this.customerToDelete()!.customerID).subscribe({
        next: () => {
          this.loadCustomers();
          this.customerToDelete.set(null);
          console.log('Customer deleted successfully');
        },
        error: (error) => console.error('Error deleting customer:', error)
      });
    }
  }

  openCreateModal() {
    this.showCreateModal.set(true);
  }

  closeCreateModal() {
    this.showCreateModal.set(false);
  }

  saveNewCustomer(customerData: Omit<Customer, 'customerID'>) {
    this.customerService.createCustomer({
      ...customerData,
      customerID: 0 // This will be assigned by the backend
    }).subscribe({
      next: () => {
        this.loadCustomers();
        this.closeCreateModal();
        console.log('Customer created successfully');
      },
      error: (error) => console.error('Error creating customer:', error)
    });
  }

  toggleManageMode() {
    this.isManageMode.update(current => !current);
  }
}
