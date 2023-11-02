import { useGetLandingPageQuery } from '../../services'
import Header from './components/Header'
import KidCollection from './components/KidCollection'
import Feature from './components/Feature'
import { Products } from '../../components'
import Newsletter from './components/Newsletter'

const Landing = () => {
  const { data, isError, isLoading } = useGetLandingPageQuery()
  return (
    <>
      <Header products={data?.header} isError={isError} isLoading={isLoading} />
      <KidCollection
        products={data?.kidsCollection}
        isError={isError}
        isLoading={isLoading}
      />
      <Feature />
      <Products title='Popular For You' />
      <Newsletter />
    </>
  )
}

export default Landing
