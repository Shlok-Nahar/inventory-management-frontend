import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-[#1C160C]">Edit Product</h3>
          <div class="mt-2 px-7 py-3">
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
  };

  ngOnInit() {
    this.editedProduct = { ...this.product };
  }

  onSave() {
    this.save.emit(this.editedProduct);
  }

  onCancel() {
    this.cancel.emit();
  }
}
