import tw, { styled } from 'twin.macro'

export const ProductPrice = styled.h3<{ $isDiscount: boolean }>`
  ${tw`relative font-bold leading-9 text-text-xl`}
  ${({ $isDiscount }) =>
    $isDiscount
      ? tw`text-neutral-grey before:(absolute top-1/2 left-0 w-full h-0.5 bg-neutral-grey)`
      : tw`text-primary-black`}
`
export const ProductDiscountPrice = tw.h3`ml-2.5 font-bold text-primary-black text-text-xl`

export const ProductDiscountPercent = tw.p`font-bold text-text-lg text-secondary-red leading-7`

export const ProductShopCardSizeBtn = styled.button<{ $activeSize: boolean }>`
  ${tw`w-full py-4 border border-neutral-soft-grey h-14`}
  ${({ $activeSize }) => $activeSize && tw` border-primary-black`}}
`

export const ProductShopCardBtn = tw.button`h-14 flex items-center justify-center w-full font-bold`
