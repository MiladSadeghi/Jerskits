import { TLandingPageHeaderProduct } from '../../../shared/types/LandingPage.types'

type Props = {
  products: TLandingPageHeaderProduct[] | undefined
  isError: boolean
  isLoading: boolean
}

const Header = ({ products, isError, isLoading }: Props) => {
  return <div>Header</div>
}

export default Header
