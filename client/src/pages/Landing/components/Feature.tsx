import tw from 'twin.macro'
import FeatureContent from '../../../shared/FeatureContent'

const Feature = () => {
  const featureContent = FeatureContent({ color: 'black' })
  return (
    <Wrapper>
      {featureContent.map((content: IFeature, index: number) => (
        <div
          key={index}
          className='relative flex flex-col items-center w-full lg:flex-row'
        >
          <Content>
            <div>{content.icon}</div>
            <ContentTitle>{content.title}</ContentTitle>
            <ContentDesc>{content.description}</ContentDesc>
          </Content>
          {index < featureContent.length - 1 && <Bar />}
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = tw.div`container mx-auto flex flex-col items-center lg:justify-between my-24 lg:flex-row gap-y-24`
const Content = tw.div`flex flex-col items-center justify-center text-center gap-y-5 relative w-full`
const ContentTitle = tw.h1`text-2xl font-bold text-primary-black`
const ContentDesc = tw.p`text-base text-neutral-dark-grey w-2/3 lg:w-full 2xl:w-2/3`
const Bar = tw.div`absolute -bottom-[30%] h-0.5 w-24 lg:(h-24 w-0.5 mt-0 right-0 top-1/2 -translate-y-1/2) bg-neutral-soft-grey`

export default Feature
