import ProductCard from './ProductCard'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import {
  useAddProductToFavoritesMutation,
  useRemoveProductFromFavoritesMutation
} from '../../services'
import { IProduct } from '../../shared/types/Product.types'

type Props = {
  products: IProduct[]
}

const ProductCardContainer = ({ products }: Props) => {
  const userFavoriteProductsId = useAppSelector(
    (state: RootState) => state.user.favorites
  ).map((product) => product._id)
  console.log(userFavoriteProductsId)
  const isUserAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const [addProductToFavorites, { isLoading: isAdding }] =
    useAddProductToFavoritesMutation()

  const [removeProductFromFavorites, { isLoading: isRemoving }] =
    useRemoveProductFromFavoritesMutation()

  const likeLoading = isAdding || isRemoving
  return products.map((product) => (
    <ProductCard
      product={product}
      key={product._id}
      likeable={isUserAuthenticated}
      isLiked={userFavoriteProductsId.includes(product._id)}
      likeLoading={likeLoading}
      favoriteHandler={() =>
        isUserAuthenticated
          ? userFavoriteProductsId.includes(product._id)
            ? removeProductFromFavorites(product._id)
            : addProductToFavorites(product._id)
          : null
      }
    />
  ))
}

export default ProductCardContainer
