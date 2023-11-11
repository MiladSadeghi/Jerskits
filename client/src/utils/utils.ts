function calculateDiscount(price: number, discountPrice: number): string {
  const discountPercent = (discountPrice / price) * 100
  return discountPercent.toFixed(0)
}

export { calculateDiscount }
