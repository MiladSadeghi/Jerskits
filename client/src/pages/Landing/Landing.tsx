import { useGetLandingPageQuery } from '../../services'
import Header from './components/Header'
import KidCollection from './components/KidCollection'
import Feature from './components/Feature'

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
    </>
  )
}

export default Landing
