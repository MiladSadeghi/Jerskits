import { TLandingPageHeaderProduct } from '../../shared/types/LandingPage.types'

type Props = {
  product: TLandingPageHeaderProduct
  currentSlide: number
  index: number
  key?: string
}

const HeaderSlide = ({ product, currentSlide, index }: Props) => {
  return <div>HeaderSlide</div>
}

export default HeaderSlide
