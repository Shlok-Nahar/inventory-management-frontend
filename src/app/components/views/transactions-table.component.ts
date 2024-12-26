import { Component, signal, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { Transaction } from '../../models/transaction.interface';
import { TransactionService } from '../../services/transaction.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
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
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">Transaction ID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">Type</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[100px] text-sm font-medium">Quantity</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">Date</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">Product Name</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">SupplierID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[200px] text-sm font-medium">CustomerID</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (transaction of transactions(); track transaction.transactionID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{transaction.transactionID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{transaction.transactionType}}</td>
                        <td class="h-[72px] px-4 py-2 w-[100px] text-[#1C160C] text-sm">{{transaction.quantity}}</td>
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{transaction.transactionDate | date:'short'}}</td>
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{getProductName(transaction.productID)}}</td>
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{transaction.supplierID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[200px] text-[#1C160C] text-sm">{{transaction.customerID}}</td>
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
export class TransactionTableComponent implements OnInit {
  transactions = signal<Transaction[]>([]);
  productNames = new Map<number, string>();

  constructor(
    private readonly transactionService: TransactionService,
    private readonly productService: ProductService
  ) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.fetchProductNames(data);
      },
      error: (error) => console.error('Error fetching transactions:', error)
    });
  }

  fetchProductNames(transactions: Transaction[]) {
    transactions.forEach(transaction => {
      if (!this.productNames.has(transaction.productID)) {
        this.productService.getProduct(transaction.productID).subscribe({
          next: (product) => {
            this.productNames.set(transaction.productID, product.productName);
          },
          error: (error) => console.error(`Error fetching product ${transaction.productID}:`, error)
        });
      }
    });
  }

  getProductName(productID: number): string {
    return this.productNames.get(productID) ?? 'Loading...';
  }
}
