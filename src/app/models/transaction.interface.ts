export interface Transaction {
  transactionID: number;
  transactionType: string;
  quantity: number;
  transactionDate: Date;
  productID: number;
  productName: string;
  supplierID?: number;
  supplierName?: string;
  customerID?: number;
  customerName?: string;
}
