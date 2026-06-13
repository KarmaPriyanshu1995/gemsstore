import type { PaymentFormData, PaymentMethod } from "@/types/payment";

const UPI_PATTERN = /^[\w.-]+@[\w.-]+$/;
const CARD_PATTERN = /^[\d\s]{13,19}$/;
const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_PATTERN = /^\d{3,4}$/;

export function validatePaymentForm(
  method: PaymentMethod,
  form: PaymentFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (method) {
    case "upi":
      if (!form.upiId.trim()) {
        errors.upiId = "UPI ID is required.";
      } else if (!UPI_PATTERN.test(form.upiId.trim())) {
        errors.upiId = "Enter a valid UPI ID (e.g. name@bank).";
      }
      break;

    case "credit-card":
    case "debit-card":
      if (!form.cardNumber.trim()) {
        errors.cardNumber = "Card number is required.";
      } else if (!CARD_PATTERN.test(form.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Enter a valid card number.";
      }
      if (!form.cardName.trim()) {
        errors.cardName = "Name on card is required.";
      }
      if (!form.cardExpiry.trim()) {
        errors.cardExpiry = "Expiry date is required.";
      } else if (!EXPIRY_PATTERN.test(form.cardExpiry.trim())) {
        errors.cardExpiry = "Use MM/YY format.";
      }
      if (!form.cardCvv.trim()) {
        errors.cardCvv = "CVV is required.";
      } else if (!CVV_PATTERN.test(form.cardCvv.trim())) {
        errors.cardCvv = "Enter a valid CVV.";
      }
      break;

    case "net-banking":
      if (!form.bank) {
        errors.bank = "Select your bank.";
      }
      break;

    case "wallet":
      if (!form.wallet) {
        errors.wallet = "Select a wallet provider.";
      }
      break;
  }

  return errors;
}
