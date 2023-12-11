import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function calculateDiscount(
  price: number,
  discountPrice: number
): string {
  const discountPercent = ((price - discountPrice) / price) * 100
  return discountPercent.toFixed(0)
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
