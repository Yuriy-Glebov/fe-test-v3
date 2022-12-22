import { createReceipt, Receipt } from "../../src/model/Receipt";
import { createReceiptPrinter } from "../../src/ReceiptPrinter";

export function printStandardReceipt(receipt:Receipt) {
    return createReceiptPrinter(40).printReceipt(receipt)
}