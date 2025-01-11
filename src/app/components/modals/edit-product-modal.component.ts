import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';
import { Customer } from '../../models/customer.interface';
import { Supplier } from '../../models/supplier.interface';
import { CustomerService } from '../../services/customer.service';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-[#1C160C]">Edit Product</h3>
          <div class="grid grid-cols-2 gap-4">
            <!-- Left Column -->
            <div>
              <div class="mt-2 px-7 py-1">
                <form>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-[#1C160C] mb-2">Product Name</label>
                    <input 
                      type="text" 
                      [(ngModel)]="editedProduct.productName"
                      name="productName"
                      class="w-full px-3 py-2 border border-[#E9DFCE] rounded-md focus:outline-none focus:border-[#1C160C]"
                    />
                  </div>
                </form>
              </div>
              <div class="mt-2 px-7 py-1">
                <form>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-[#1C160C] mb-2">Product Price</label>
                    <input 
                      type="number" 
                      [(ngModel)]="editedProduct.price"
                      name="price"
                      class="w-full px-3 py-2 border border-[#E9DFCE] rounded-md focus:outline-none focus:border-[#1C160C]"
                    />
                  </div>
                </form>
              </div>
              <div class="mt-2 px-7 py-1">
                <form>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-[#1C160C] mb-2">Product Stock</label>
                    <input 
                      type="number" 
                      [(ngModel)]="editedProduct.stock"
                      name="stock"
                      class="w-full px-3 py-2 border border-[#E9DFCE] rounded-md focus:outline-none focus:border-[#1C160C]"
                    />
                  </div>
                </form>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <!-- Supplier Selection -->
              <div class="mt-2 px-7 py-1">
                <label class="block text-sm font-medium text-[#1C160C] mb-2">Select Supplier</label>
                <div class="border border-[#E9DFCE] rounded-md h-[150px] overflow-y-auto">
                  <table class="w-full">
                    <thead class="sticky top-0 bg-white">
                      <tr class="border-b border-[#E9DFCE]">
                        <th class="px-4 py-2 text-left text-sm">ID</th>
                        <th class="px-4 py-2 text-left text-sm">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (supplier of suppliers; track supplier.supplierID) {
                        <tr 
                          class="hover:bg-[#E9DFCE] cursor-pointer"
                          [class.bg-[#E9DFCE]]="editedProduct.supplierID === supplier.supplierID"
                          (click)="selectSupplier(supplier)"
                        >
                          <td class="px-4 py-2 text-sm">{{supplier.supplierID}}</td>
                          <td class="px-4 py-2 text-sm">{{supplier.supplierName}}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Customer Selection -->
              <div class="mt-4 px-7 py-1">
                <label class="block text-sm font-medium text-[#1C160C] mb-2">Select Customer</label>
                <div class="border border-[#E9DFCE] rounded-md h-[150px] overflow-y-auto">
                  <table class="w-full">
                    <thead class="sticky top-0 bg-white">
                      <tr class="border-b border-[#E9DFCE]">
                        <th class="px-4 py-2 text-left text-sm">ID</th>
                        <th class="px-4 py-2 text-left text-sm">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (customer of customers; track customer.customerID) {
                        <tr 
                          class="hover:bg-[#E9DFCE] cursor-pointer"
                          [class.bg-[#E9DFCE]]="editedProduct.customerID === customer.customerID"
                          (click)="selectCustomer(customer)"
                        >
                          <td class="px-4 py-2 text-sm">{{customer.customerID}}</td>
                          <td class="px-4 py-2 text-sm">{{customer.customerName}}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4 px-4 py-3 mt-4">
            <button 
              class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded"
              (click)="onCancel()"
            >
              Cancel
            </button>
            <button 
              class="bg-[#1C160C] text-white hover:bg-[#E9DFCE] hover:text-[#1C160C] font-bold py-2 px-4 rounded"
              (click)="onSave()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EditProductModalComponent {
  @Input() product!: Product;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  editedProduct: Product = {
    productID: 0,
    productName: '',
    price: 0,
    stock: 0,
    supplierID: 0,
    customerID: 0
  };

  suppliers: Supplier[] = [];
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.editedProduct = { ...this.product };
    this.loadSuppliers();
    this.loadCustomers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => this.suppliers = data,
      error: (error) => console.error('Error loading suppliers:', error)
    });
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('Error loading customers:', error)
    });
  }

  selectSupplier(supplier: Supplier) {
    this.editedProduct.supplierID = supplier.supplierID;
  }

  selectCustomer(customer: Customer) {
    this.editedProduct.customerID = customer.customerID;
  }

  onSave() {
    this.save.emit(this.editedProduct);
  }

  onCancel() {
    this.cancel.emit();
  }
}
