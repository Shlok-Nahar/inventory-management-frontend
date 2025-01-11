import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-delete-product-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-[#1C160C] mb-4">Delete Product</h3>
          <p class="text-[#1C160C] mb-6">Are you sure you want to delete this product?</p>
          <div class="flex justify-end gap-4">
            <button 
              class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded"
              (click)="onCancel()"
            >
              No
            </button>
            <button 
              class="bg-[#E34234] text-white hover:bg-[#ba3529] font-bold py-2 px-4 rounded"
              (click)="onConfirm()"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DeleteConfirmationDialogComponent {
  @Input() product!: Product;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
