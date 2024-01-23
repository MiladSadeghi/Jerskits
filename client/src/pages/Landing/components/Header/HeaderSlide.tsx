import { LazyMotion, Variants, domAnimation, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TLandingPageHeaderProduct } from '../../../../shared/types/LandingPage.types'
import provideBrandLogo from '../../../../utils/brand-logo'

type Props = {
  product: TLandingPageHeaderProduct
  currentSlide: number
  index: number
  key?: string
}

const backgroundVariants: Variants = {
  initial: {
    opacity: 0,
    background: '#262D33',
    transition: {
      delay: 0.5
    }
  },
  animate: {
    opacity: 0.6,
    background: '#262D33',
    transition: {
      delay: 0.3
    }
  }
}

const contentWrapper: Variants = {
  initial: {
    paddingTop: 'var(--content-paddingTop)',
    justifyContent: 'space-between',
    marginLeft: 'var(--content-marginLeft)',
    transition: {
      delay: 0.5
    }
  },
  animate: {
    paddingTop: '44px',
    justifyContent: 'start',
    marginLeft: '125px',
    transition: {
      delay: 0.6
    }
  }
}

const teamNameVariants: Variants = {
  currentInitial: {
    width: '0%',
    fontSize: 'var(--current-initial-font-size)',
    fontWeight: 700
  },
  upcomingInitial: {
    fontSize: '48px',
    fontWeight: 500,
    transition: { delay: 0.7, duration: 0.3 }
  },
  currentAnimate: {
    width: '100%',
    transition: { delay: 0.4, duration: 0.4 }
  },
  upcomingAnimate: {
    fontSize: 'var(--current-initial-font-size)',
    fontWeight: 700,
    transition: { delay: 0.2, duration: 0.3 }
  }
}

const teamKitWrapperVariants: Variants = {
  currentInitial: {
    opacity: 0,
    left: 'var(--current-initial-left)',
    transform: 'translate(-50%, -50%)',
    marginTop: 0,
    width: 'var(--current-initial-width)'
  },
  currentAnimate: {
    opacity: 1,
    left: 'var(--current-initial-left)',
    transform: 'translate(-50%, -50%)',
    marginTop: 0,
    width: 'var(--current-initial-width)'
  },
  upcomingInitial: {
    width: '251px',
    left: 'var(--upcoming-initial-left, 120px)',
    transform: 'translateY(-50%)',
    marginTop: 34,
    transition: {
      delay: 0.8,
      duration: 0.2
    }
  },
  upcomingAnimate: {
    width: 'var(--current-initial-width)',
    left: 'var(--current-initial-left)',
    transform: 'translate(-50%, -50%)',
    marginTop: 0
  }
}
const teamKitImageVariants: Variants = {
  initial: {
    filter: 'drop-shadow(-98px 67px 150px rgba(0,0,0,0))',
    transition: {
      ease: 'easeInOut',
      duration: 0.5,
      delay: 0.5
    }
  },
  animate: {
    filter: 'drop-shadow(-98px 67px 150px rgba(0,0,0,.5))',
    transition: {
      ease: 'easeInOut',
      duration: 0.5
    }
  }
}

const TeamLogoVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { delay: 0.7 }
  }
}

const TitleVariants: Variants = {
  initial: {
    width: '0%'
  },
  animate: {
    width: '100%',
    transition: { delay: 1, duration: 2 }
  }
}

const howWasMadeVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.7, delay: 1 }
  },
  upcomingSlideAnimate: {
    opacity: 1,
    transition: { duration: 0, delay: 2 }
  }
}

const howWasMadeBlurVariants: Variants = {
  initial: {
    background: 'rgba(0, 0, 0, 0)',
    backdropFilter: 'blur(0px)'
  },
  animate: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(50px)',
    transition: {
      delay: 2,
      duration: 1
    }
  }
}

const posterDescriptionVariants: Variants = {
  initial: {
    height: '0%'
  },
  animate: {
    height: 'fit-content',
    transition: {
      delay: 1.1,
      duration: 0.6
    }
  }
}

const ShopButtonVariants: Variants = {
  initial: {
    width: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  animate: {
    width: 'fit-content',
    paddingLeft: 12,
    paddingRight: 12,
    transition: {
      delay: 1.7
    }
  }
}

const SkewedRectangleVariants: Variants = {
  initial: {
    height: '0%'
  },
  animate: {
    height: '100%',
    transition: { duration: 1.2, delay: 1.4 }
  }
}

const HeaderSlide = ({ product, currentSlide, index }: Props) => {
  const [delay, setDelay] = useState<number>(2.3)

  useEffect(() => {
    if (currentSlide !== 0) {
      setDelay(0.5)
    }
    if (currentSlide < index) {
      setDelay(2.3)
    }
  }, [currentSlide])

  const slideVariants: Variants = {
    initial: {
      marginLeft: '0rem',
      transition: {
        easings: ['easeInOut'],
        delay: 0.1
      }
    },
    animate: {
      marginLeft: 'var(--slide-animate-margin, 0)',
      transition: {
        easings: ['easeInOut'],
        delay: delay
      }
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        variants={slideVariants}
        initial='initial'
        animate={index - 1 === currentSlide ? 'animate' : 'initial'}
        className='relative flex h-full min-w-full overflow-hidden [--slide-animate-margin:0rem] xl:[--slide-animate-margin:-20rem]'
      >
        <m.div
          variants={backgroundVariants}
          initial='initial'
          animate={index <= currentSlide ? 'animate' : 'initial'}
          className={`absolute left-0 top-0 z-[6] h-full w-full`}
        />
        <img
          className='absolute left-0 top-0 z-[3] h-full w-full object-cover'
          alt={`${product.teamName} stadium`}
          src={product.stadiumImage}
        />
        <m.div
          variants={contentWrapper}
          initial={index === currentSlide && 'initial'}
          animate={index > currentSlide ? 'animate' : 'initial'}
          className='absolute left-0 top-0 ml-[30px] flex h-full w-full xl:w-4/5 flex-col pb-11 pr-11
						[--content-paddingTop:44px]
						lg:[--content-paddingTop:88px]
						[--content-marginLeft:30px]
						xl:[--content-marginLeft:50px]
						2xl:[--content-marginLeft:70px]
						3xl:[--content-marginLeft:130px]'
        >
          <div>
            <div className='relative z-[7] mb-8 w-1/2'>
              <m.img
                src={product.teamLogo}
                alt={`${product.teamName} logo`}
                variants={TeamLogoVariants}
                initial='initial'
                animate='animate'
                width='64'
              />
            </div>

            <m.div
              variants={TitleVariants}
              initial='initial'
              animate='animate'
              className={`relative z-[7] flex flex-col lg:flex-row lg:items-center overflow-hidden`}
            >
              <img
                className='brightness-[100] '
                src={provideBrandLogo(product.brand as string)}
                alt={product.brand}
                width='40'
                height='40'
              />
              <h2
                className={`lg:ml-4 block whitespace-nowrap font-bold text-white`}
              >
                {product.posterTitle}
              </h2>
            </m.div>
          </div>
          <m.h1
            variants={teamNameVariants}
            initial={index === 0 ? 'currentInitial' : 'upcomingInitial'}
            animate={
              index === 0
                ? 'currentAnimate'
                : index === currentSlide
                ? 'upcomingAnimate'
                : 'upcomingInitial'
            }
            className={`relative z-[7] overflow-hidden font-BebasNeue uppercase leading-none tracking-wide text-white whitespace-nowrap
						[--current-initial-font-size:21vw] xl:[--current-initial-font-size:17.9vw] scale-y-150 md:scale-y-100
					`}
          >
            {product.teamName}
          </m.h1>
          <div className='space-between relative z-[9] grid grid-cols-12 gap-y-11 lg:gap-0'>
            <m.div
              className={`z-40 flex h-full col-span-11 lg:col-span-6 2xl:col-span-5`}
              variants={howWasMadeVariants}
              initial={'initial'}
              animate={
                index <= currentSlide ? 'animate' : 'upcomingSlideInitial'
              }
            >
              <img
                src={product.kitLogo}
                className='w-[136px] h-[136px] lg:h-[241px] lg:w-[241px]'
                alt='kit logo'
                width='241'
                height='241'
              />
              <m.div
                variants={howWasMadeBlurVariants}
                initial='initial'
                animate='animate'
                className='z-[9] flex flex-col justify-center pl-4 pr-6 lg:pl-6 lg:pr-8 xl:pl-10 xl:pr-12'
              >
                <h1 className='mb-[10px] text-2xl font-bold text-white'>
                  How Was Made?
                </h1>
                <p className='text-sm leading-6 line-clamp-2 lg:line-clamp-4 text-neutral-grey'>
                  {product.howWasMade}
                </p>
              </m.div>
            </m.div>
            <div className='flex flex-col justify-between col-span-11 lg:col-span-3 lg:col-start-8 break-word'>
              <m.p
                variants={posterDescriptionVariants}
                initial='initial'
                animate='animate'
                className='leading-6 line-clamp-4 text-neutral-grey mb-11 lg:mb-0'
              >
                {product.posterDescription}
              </m.p>
              <m.button
                variants={ShopButtonVariants}
                initial='initial'
                animate='animate'
                aria-label='Shop Now'
                className='font-bold bg-white w-fit flex items-center justify-center py-3.5 overflow-hidden whitespace-nowrap'
              >
                SHOP NOW
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  className='ml-3 text-primary-black'
                >
                  <path
                    d='M10.8334 5.41699L15.4167 10.0003M15.4167 10.0003L10.8334 14.5837M15.4167 10.0003H3.33335'
                    stroke='#262D33'
                    strokeWidth='1.2'
                  />
                </svg>
              </m.button>
            </div>
          </div>
        </m.div>

        <m.div
          variants={teamKitWrapperVariants}
          initial={index === 0 ? 'currentInitial' : 'upcomingInitial'}
          animate={
            index === 0
              ? 'currentAnimate'
              : currentSlide >= index
              ? 'upcomingAnimate'
              : 'upcomingInitial'
          }
          className={`absolute z-[8] flex items-center justify-center top-[35%] lg:top-1/2
				[--current-initial-left:70%] lg:[--current-initial-left:44%]
				[--current-initial-width:60vw] md:[--current-initial-width:323px] xl:[--current-initial-width:420px] 2xl:[--current-initial-width:446px]
				`}
        >
          <m.img
            variants={teamKitImageVariants}
            initial={currentSlide === index && 'initial'}
            animate={currentSlide === index ? 'animate' : 'initial'}
            src={product.poster}
            alt={`${product.teamName} kit`}
            width='100%'
          />
        </m.div>
        <div className='hidden overflow-hidden lg:block'>
          <m.div
            variants={SkewedRectangleVariants}
            initial='initial'
            animate={index <= currentSlide ? 'animate' : 'initial'}
            className={`absolute bottom-0 right-[106px] z-[5] w-full skew-x-[14deg] bg-neutral-light-grey
					lg:w-[17rem] xl:w-[20rem] 3xl:w-[24rem] `}
          />
        </div>
      </m.section>
    </LazyMotion>
  )
}

export default HeaderSlide
