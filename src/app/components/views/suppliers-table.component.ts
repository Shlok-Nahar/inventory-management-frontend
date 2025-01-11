import { Component, signal } from '@angular/core';
import { Supplier } from '../../models/supplier.interface';
import { SupplierService } from '../../services/supplier.service';
import { CommonModule } from '@angular/common';
import { EditSupplierModalComponent } from '../modals/edit-supplier-modal.component';
import { DeleteConfirmationDialogComponent } from '../modals/delete-supplier-confirmation-dialog.component';
import { CreateSupplierModalComponent } from '../modals/create-supplier-modal.component';

@Component({
  selector: 'app-suppliers-table',
  standalone: true,
    imports: [
      CommonModule, 
      EditSupplierModalComponent, 
      DeleteConfirmationDialogComponent,
      CreateSupplierModalComponent
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
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">SupplierID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Name</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Contact</th>
                      <th class="px-4 py-3 text-center text-[#1C160C] w-[400px] text-sm font-medium">
                        <div class="flex justify-center gap-2">
                          <button 
                            class="bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded"
                            (click)="toggleManageMode()">
                            {{ isManageMode() ? 'Done' : 'Manage Suppliers' }}
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
                    @for (supplier of suppliers(); track supplier.supplierID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.supplierID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.supplierName}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{supplier.contactInfo}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm text-center">
                          @if (isManageMode()) {
                            <button 
                              class="inline-flex items-center gap-2 bg-[#E9DFCE] hover:bg-[#1C160C] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded mr-2"
                              (click)="editSupplier(supplier)">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                            
                            <button 
                              class="inline-flex items-center gap-2 bg-[#E9DFCE] hover:bg-[#E34234] text-[#1C160C] hover:text-white font-bold py-2 px-4 rounded ml-2"
                              (click)="deleteSupplier(supplier)">
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

    @if (selectedSupplier()) {
      <app-edit-supplier-modal
        [supplier]="selectedSupplier()!"
        (save)="saveSupplier($event)"
        (cancel)="closeModal()"
      />
    }

    @if (supplierToDelete()) {
      <app-delete-supplier-confirmation-dialog
        [supplier]="supplierToDelete()!"
        (confirm)="confirmDelete()"
        (cancel)="cancelDelete()"
      />
    }

    @if (showCreateModal()) {
      <app-create-supplier-modal
        (save)="saveNewSupplier($event)"
        (cancel)="closeCreateModal()"
      />
    }
  `
})

export class SupplierTableComponent {
  suppliers = signal<Supplier[]>([]);
  isManageMode = signal<boolean>(false);
  selectedSupplier = signal<Supplier | null>(null);
  supplierToDelete = signal<Supplier | null>(null);
  showCreateModal = signal<boolean>(false);
  
  constructor(private readonly supplierService: SupplierService) {}

  ngOnInit() {
      this.loadSuppliers();
    }
  
    loadSuppliers() {
      this.supplierService.getSuppliers().subscribe({
        next: (data) => this.suppliers.set(data),
        error: (error) => console.error('Error fetching suppliers:', error)
      });
    }
  
    editSupplier(supplier: Supplier) {
      this.selectedSupplier.set(supplier);
    }
  
    closeModal() {
      this.selectedSupplier.set(null);
    }
  
    saveSupplier(supplier: Supplier) {
      this.supplierService.updateSupplier(supplier.supplierID, supplier).subscribe({
        next: () => {
          this.loadSuppliers();
          this.closeModal();
          console.log('Supplier updated successfully');
        },
        error: (error) => console.error('Error updating supplier:', error)
      });
    }
  
    deleteSupplier(supplier: Supplier) {
      this.supplierToDelete.set(supplier);
    }
  
    cancelDelete() {
      this.supplierToDelete.set(null);
    }
  
    confirmDelete() {
      if (this.supplierToDelete()) {
        this.supplierService.deleteSupplier(this.supplierToDelete()!.supplierID).subscribe({
          next: () => {
            this.loadSuppliers();
            this.supplierToDelete.set(null);
            console.log('Supplier deleted successfully');
          },
          error: (error) => console.error('Error deleting supplier:', error)
        });
      }
    }
  
    openCreateModal() {
      this.showCreateModal.set(true);
    }
  
    closeCreateModal() {
      this.showCreateModal.set(false);
    }
  
    saveNewSupplier(supplierData: Omit<Supplier, 'supplierID'>) {
      this.supplierService.createSupplier({
        ...supplierData,
        supplierID: 0 // This will be assigned by the backend
      }).subscribe({
        next: () => {
          this.loadSuppliers();
          this.closeCreateModal();
          console.log('Supplier created successfully');
        },
        error: (error) => console.error('Error creating supplier:', error)
      });
    }
  
    toggleManageMode() {
      this.isManageMode.update(current => !current);
    }
}
