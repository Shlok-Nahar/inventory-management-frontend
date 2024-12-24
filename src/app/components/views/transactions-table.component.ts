//TODO: Implement the transactions-table such that it can link with the right product, supplier, and customer


import { Component, signal } from '@angular/core';
import { Transaction } from '../../models/transaction.interface';

@Component({
  selector: 'app-transactions-table',
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
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">TransactionID</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Transaction Type</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Quantity</th>
                      <th class="px-4 py-3 text-left text-[#1C160C] w-[400px] text-sm font-medium">Transaction Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (transaction of transactions(); track transaction.transactionID) {
                      <tr class="border-t border-t-[#E9DFCE]">
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{transaction.transactionID}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{transaction.transactionType}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{transaction.quantity}}</td>
                        <td class="h-[72px] px-4 py-2 w-[400px] text-[#1C160C] text-sm">{{transaction.transactionDate}}</td>
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

export class TransactionTableComponent {
  transactions = signal<Transaction[]>([]);
}
