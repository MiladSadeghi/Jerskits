import { m, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import FeatureContent from '../../shared/FeatureContent'
import AuthLayoutSlide from './AuthLayoutSlide'

const AuthLayoutSlider = () => {
  const featureContent = FeatureContent({ color: 'white' })
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const canScrollPrev = activeSlide >= -1
  const canScrollNext = activeSlide < featureContent.length
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const offsetX = useMotionValue(0)
  const animatedX = useSpring(offsetX, {
    damping: 35,
    stiffness: 300
  })

  const handleChangeSlide = (index: number) => {
    if (!canScrollPrev || !canScrollNext) return
    const slideWidth = itemsRef.current.at(index)?.getBoundingClientRect().width
    if (slideWidth === undefined) return
    offsetX.set(slideWidth * -index)

    setActiveSlide(index)
  }

  return (
    <div className='relative w-full h-full overflow-hidden'>
      <m.ul
        style={{
          x: animatedX
        }}
        className='relative z-10 flex w-full h-full'
      >
        {featureContent.map((feature, index) => (
          <li
            className='min-w-full'
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <AuthLayoutSlide {...feature} />
          </li>
        ))}
      </m.ul>
      <div className='absolute z-20 flex items-center justify-center w-full bottom-10 gap-x-5'>
        {featureContent.map((_, index) => (
          <div
            onClick={() => handleChangeSlide(index)}
            key={index}
            className={`bg-white rounded-full h-2 w-2  ${
              activeSlide === index ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AuthLayoutSlider
