import React from 'react'
import { IProduct } from '../../../shared/types/Product.types'

type Props = {
  products: IProduct[] | undefined
  isError: boolean
  isLoading: boolean
}

const KidCollection = ({ products, isError, isLoading }: Props) => {
  return <div>KidCollection</div>
}

export default KidCollection
