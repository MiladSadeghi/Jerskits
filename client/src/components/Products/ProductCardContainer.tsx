import ProductCard from './ProductCard'
import { useAppSelector } from '../../App/hooks'
import {
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation
} from '../../services'
import { IProduct } from '../../shared/types/Product.types'

type Props = {
  products?: IProduct[]
  cardWidth?: number
}

const ProductCardContainer = ({ products, cardWidth }: Props) => {
  const userFavoriteProductsId = useAppSelector(
    (state) => state.user.favorites
  ).map((product) => product._id)

  const isUserAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  )
  const [addProductToFavorites, { isLoading: isAdding }] =
    useAddProductToFavoritesMutation()

  const [removeProductFromFavorites, { isLoading: isRemoving }] =
    useRemoveProductFromFavoritesMutation()

  const likeLoading = isAdding || isRemoving
  return products?.map((product) => (
    <ProductCard
      product={product}
      key={product._id}
      isLikeable={isUserAuthenticated}
      isCurrentLiked={userFavoriteProductsId.includes(product._id)}
      isLikeLoading={likeLoading}
      isMini={false}
      addFavorite={() => addProductToFavorites(product._id)}
      removeFavorite={() => removeProductFromFavorites(product._id)}
      width={cardWidth}
    />
  ))
}

export default ProductCardContainer
