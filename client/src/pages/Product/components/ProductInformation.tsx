import { useState } from 'react'
import { TDetailProduct } from '../../../shared/types/Product.types'
import { Accordion } from '../../../components'

type TProductInformationProps = {
  details?: TDetailProduct[]
}

const ProductInformation = ({ details }: TProductInformationProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0)
  const changeActiveAccordion = (idx: number) => {
    if (activeAccordion === idx) {
      setActiveAccordion(null)
    } else {
      setActiveAccordion(idx)
    }
  }
  return details?.map((item: TDetailProduct, idx: number) => (
    <Accordion
      detailProduct={item}
      active={activeAccordion === idx}
      handleActive={() => changeActiveAccordion(idx)}
      key={idx}
    />
  ))
}

export default ProductInformation
