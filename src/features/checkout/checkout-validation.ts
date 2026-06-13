import type { CheckoutAddress, CheckoutFormData } from "@/types/checkout";
import type { CheckoutStep } from "@/features/checkout/checkout.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s-]{10,}$/;

function validateAddress(
  address: CheckoutAddress,
  prefix: string,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!address.fullName.trim()) {
    errors[`${prefix}.fullName`] = "Full name is required.";
  }

  if (!address.email.trim()) {
    errors[`${prefix}.email`] = "Email is required.";
  } else if (!EMAIL_PATTERN.test(address.email)) {
    errors[`${prefix}.email`] = "Enter a valid email address.";
  }

  if (!address.phone.trim()) {
    errors[`${prefix}.phone`] = "Phone number is required.";
  } else if (!PHONE_PATTERN.test(address.phone)) {
    errors[`${prefix}.phone`] = "Enter a valid phone number.";
  }

  if (!address.line1.trim()) {
    errors[`${prefix}.line1`] = "Address is required.";
  }

  if (!address.city.trim()) {
    errors[`${prefix}.city`] = "City is required.";
  }

  if (!address.state.trim()) {
    errors[`${prefix}.state`] = "State is required.";
  }

  if (!address.postalCode.trim()) {
    errors[`${prefix}.postalCode`] = "Postal code is required.";
  }

  if (!address.country.trim()) {
    errors[`${prefix}.country`] = "Country is required.";
  }

  return errors;
}

export function validateCheckoutStep(
  step: CheckoutStep,
  form: CheckoutFormData,
): Record<string, string> {
  switch (step) {
    case "shipping":
      return validateAddress(form.shipping, "shipping");
    case "billing":
      if (form.sameAsShipping) return {};
      return validateAddress(form.billing, "billing");
    case "delivery":
      return {};
    default:
      return {};
  }
}

export const emptyCheckoutAddress = (): CheckoutAddress => ({
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
});

export const emptyCheckoutForm = (): CheckoutFormData => ({
  shipping: emptyCheckoutAddress(),
  billing: emptyCheckoutAddress(),
  sameAsShipping: true,
  delivery: {
    method: "standard",
    instructions: "",
  },
});
