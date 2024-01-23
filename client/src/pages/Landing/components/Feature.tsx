import FeatureContent from '../../../shared/FeatureContent'

const Feature = () => {
  const featureContent = FeatureContent({ color: 'black' })
  return (
    <div className='container flex flex-col items-center mx-auto py-24 lg:justify-between lg:flex-row gap-y-24'>
      {featureContent.map((content: IFeature, index: number) => (
        <div
          key={index}
          className='relative flex flex-col items-center w-full lg:flex-row'
        >
          <div className='relative flex flex-col items-center justify-center w-full text-center gap-y-5'>
            <div>{content.icon}</div>
            <h1 className='text-2xl font-bold text-primary-black'>
              {content.title}
            </h1>
            <p className='w-2/3 text-base text-neutral-dark-grey lg:w-full 2xl:w-2/3'>
              {content.description}
            </p>
          </div>
          {index < featureContent.length - 1 && (
            <div className='absolute -bottom-[30%] h-0.5 w-24 lg:h-24 lg:w-0.5 lg:mt-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 bg-neutral-soft-grey' />
          )}
        </div>
      ))}
    </div>
  )
}

export default Feature
