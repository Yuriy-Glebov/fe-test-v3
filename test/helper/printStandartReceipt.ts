import { Receipt } from "../../src/model/Receipt";
import { ReceiptPrinter } from "../../src/ReceiptPrinter";

export function printStandardReceipt(receipt:Receipt) {
    return new ReceiptPrinter(40).printReceipt(receipt)
}