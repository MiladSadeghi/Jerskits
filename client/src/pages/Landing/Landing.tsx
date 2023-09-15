import { useGetLandingPageQuery } from '../../services'
import Header from './components/Header'

const Landing = () => {
  const { data, isError, isLoading } = useGetLandingPageQuery()
  return (
    <>
      <Header products={data?.header} isError={isError} isLoading={isLoading} />
    </>
  )
}

export default Landing
