const provideBrandLogo = (brand: string) => {
  switch (brand) {
    case 'nike':
      return '/images/nike-brand.png'
    case 'adidas':
      return '/images/adidas-brand.png'
    case 'jordan':
      return '/images/jordan-brand.png'
    case 'puma':
      return '/images/puma-brand.png'
  }
}

export default provideBrandLogo
