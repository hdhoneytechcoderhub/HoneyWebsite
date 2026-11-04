"use server";
import { saveEnquiry, saveStrategyRequest } from "@/lib/forms";
export async function submitEnquiryAction(_previous: unknown, formData: FormData) {
  const result = await saveEnquiry(Object.fromEntries(formData));
  return result;
}
export async function submitStrategyAction(_previous: unknown, formData: FormData) {
  const result = await saveStrategyRequest(Object.fromEntries(formData));
  return result;
}
