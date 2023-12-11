import { useState } from 'react'
import { TDetailProduct } from '../../../shared/types/Product.types'
import { Accordion } from '../../../components'
import { TReview } from '../../../shared/types/Review.types'
import ProductReviews from './ProductReviews'

type TProductInformationProps = {
  details: TDetailProduct[]
  reviews: TReview[]
}

const ProductInformation = ({ details, reviews }: TProductInformationProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)

  const changeActiveAccordion = (idx: number) => {
    if (activeAccordion === idx) {
      setActiveAccordion(null)
    } else {
      setActiveAccordion(idx)
    }
  }
  return (
    <>
      {details?.map((item: TDetailProduct, idx: number) => (
        <Accordion
          detailProduct={item}
          active={activeAccordion === idx}
          handleActive={() => changeActiveAccordion(idx)}
          key={idx}
        />
      ))}
      <Accordion
        active={activeAccordion === 999}
        handleActive={() => changeActiveAccordion(999)}
        content={<ProductReviews reviews={reviews} />}
        title={`Reviews ${reviews.length > 0 ? `(${reviews.length})` : ''}`}
      />
    </>
  )
}

export default ProductInformation
