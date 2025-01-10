import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.interface';

@Component({
  selector: 'app-create-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-[#1C160C]">Add New Customer</h3>
          <div class="mt-2 px-7 py-3">
            <form>
              <div class="mb-4">
                <label class="block text-sm font-medium text-[#1C160C] mb-2">Customer Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="newCustomer.customerName"
                  name="customerName"
                  class="w-full px-3 py-2 border border-[#E9DFCE] rounded-md focus:outline-none focus:border-[#1C160C]"
                />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium text-[#1C160C] mb-2">Contact Info</label>
                <input 
                  type="text" 
                  [(ngModel)]="newCustomer.contactInfo"
                  name="contactInfo"
                  class="w-full px-3 py-2 border border-[#E9DFCE] rounded-md focus:outline-none focus:border-[#1C160C]"
                />
              </div>
            </form>
          </div>
          <div class="flex justify-end gap-4 px-4 py-3">
            <button 
              class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded"
              (click)="onCancel()"
            >
              Cancel
            </button>
            <button 
              class="bg-[#1C160C] text-white hover:bg-[#E9DFCE] hover:text-[#1C160C] font-bold py-2 px-4 rounded"
              (click)="onSave()"
              [disabled]="!isValid()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CreateCustomerModalComponent {
  @Output() save = new EventEmitter<Omit<Customer, 'customerID'>>();
  @Output() cancel = new EventEmitter<void>();

  newCustomer: Omit<Customer, 'customerID'> = {
    customerName: '',
    contactInfo: ''
  };

  isValid(): boolean {
    return Boolean(this.newCustomer?.customerName?.trim()); // Only check for customer name
  }

  onSave() {
    if (this.isValid()) {
      this.save.emit({
        customerName: this.newCustomer.customerName.trim(),
        contactInfo: this.newCustomer.contactInfo?.trim() || '' // Handle empty contact info
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
