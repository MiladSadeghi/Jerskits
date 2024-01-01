import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
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

export const isValidationError = (
  error: unknown
): error is FetchBaseQueryError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'status' in error &&
    error.status === 400
  )
}

export const calculateDateDuration = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + duration)

  return endDate
}

export const formatDuration = (shippingDate: Date) => {
  const endFormatted = shippingDate.toLocaleString('en-us', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  return `Arrives ${endFormatted}`
}
