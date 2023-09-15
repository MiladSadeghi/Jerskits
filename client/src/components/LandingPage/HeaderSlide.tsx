import { Variants, motion } from 'framer-motion'
import { TLandingPageHeaderProduct } from '../../shared/types/LandingPage.types'
import provideBrandLogo from '../../utils/brand-logo'
import tw from 'twin.macro'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  product: TLandingPageHeaderProduct
  currentSlide: number
  index: number
  key?: string
}

const backgroundVariants: Variants = {
  initial: {
    opacity: 0,
    backgroundColor: '#262D33',
    transition: {
      delay: 0.5
    }
  },
  animate: {
    opacity: 0.6,
    backgroundColor: '#262D33',
    transition: {
      delay: 0.3
    }
  }
}

const contentWrapper: Variants = {
  initial: {
    marginTop: '80px',
    transition: {
      delay: 0.5
    }
  },
  animate: {
    marginTop: '44px',
    transition: {
      delay: 0.6
    }
  }
}

const teamNameVariants: Variants = {
  currentInitial: {
    width: '0%',
    fontSize: '350px',
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
    fontSize: '350px',
    fontWeight: 700,
    transition: { delay: 0.2, duration: 0.3 }
  }
}

const teamKitWrapperVariants: Variants = {
  currentInitial: {
    opacity: 0,
    top: '75%',
    left: '44%'
  },
  currentAnimate: {
    opacity: 1,
    top: '50%'
  },
  upcomingInitial: {
    width: '14%',
    left: '14%',
    marginTop: 20,
    transition: {
      delay: 0.8,
      duration: 0.2
    }
  },
  upcomingAnimate: {
    width: '25%',
    left: '44%'
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
  nextSlideInitial: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.5 }
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.7, delay: 1 }
  },
  nextSlideAnimate: {
    opacity: 1,
    transition: { duration: 0, delay: 2 }
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

  const memoizedDescription = useMemo(() => {
    return product.posterDescription.split('')
  }, [product.posterDescription])

  const slideVariants: Variants = {
    initial: {
      marginLeft: '0rem',
      transition: {
        easings: ['easeInOut'],
        delay: 0.1
      }
    },
    animate: {
      marginLeft: '-20rem',
      transition: {
        easings: ['easeInOut'],
        delay: delay
      }
    }
  }

  return (
    <motion.div
      variants={slideVariants}
      initial='initial'
      animate={index - 1 === currentSlide ? 'animate' : 'initial'}
      className='relative flex h-screen min-w-full overflow-hidden'
    >
      <motion.div
        variants={backgroundVariants}
        initial='initial'
        animate={index <= currentSlide ? 'animate' : 'initial'}
        className={`absolute top-0 left-0 w-full  h-full will-change-transform z-[6] opacity-0`}
      />
      <img
        className='absolute top-0 left-0 object-cover w-full h-full z-[3]'
        alt={`${product.teamName} stadium`}
        src={product.stadiumImage}
      />

      <motion.div
        variants={contentWrapper}
        initial='initial'
        animate={index > currentSlide ? 'animate' : 'initial'}
        className='absolute top-0 left-0 flex flex-col ml-[130px]'
      >
        <div className='relative mb-8 z-[7]'>
          <motion.img
            className='w-16'
            src={product.teamLogo}
            alt={`${product.teamName} logo`}
            variants={TeamLogoVariants}
            initial='initial'
            animate='animate'
          />
        </div>

        <motion.div
          variants={TitleVariants}
          initial='initial'
          animate='animate'
          className={`relative z-[7] mb-6 flex overflow-hidden items-center`}
        >
          <img
            className='brightness-[100] w-[40px] h-[40px] '
            src={provideBrandLogo(product.brand as string)}
            alt={product.brand}
          />
          <h4 className={`font-bold text-white whitespace-nowrap ml-4 block`}>
            {product.posterTitle}
          </h4>
        </motion.div>
        <motion.h1
          variants={teamNameVariants}
          initial={index === 0 ? 'currentInitial' : 'upcomingInitial'}
          animate={
            index === 0
              ? 'currentAnimate'
              : index === currentSlide
              ? 'upcomingAnimate'
              : 'upcomingInitial'
          }
          className={`relative  text-white uppercase font-BebasNeue tracking-wide leading-none overflow-hidden z-[7]`}
        >
          {product.teamName}
        </motion.h1>
        <div className='relative flex w-full z-[9]'>
          <motion.div
            className={`z-40 flex w-fit will-change-transform`}
            variants={howWasMadeVariants}
            initial={'initial'}
            animate={`${
              currentSlide === index ? 'animate' : 'nextSlideInitial'
            }`}
          >
            <img src={product.kitLogo} className='w-[241px] h-[241px]' />
            <motion.div
              initial={{
                background: 'rgba(0, 0, 0, 0)',
                backdropFilter: 'blur(0px)'
              }}
              animate={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(50px)',
                transition: {
                  delay: 2,
                  duration: 1
                }
              }}
              className='z-[9] flex flex-col justify-center pl-10 pr-12 will-change-transform'
            >
              <h5 className='text-2xl font-bold text-white mb-[10px]'>
                How Was Made?
              </h5>
              <p className='w-64 text-sm leading-6 text-neutral-grey line-clamp-4'>
                {product.howWasMade}
              </p>
            </motion.div>
          </motion.div>
          <div className='w-[400px] ml-[320px] flex flex-col justify-between'>
            <p className='leading-6 line-clamp-4 text-neutral-grey'>
              {memoizedDescription.map((char: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1.7 + index * 0.005,
                    duration: 0
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
            <ShopNowButton
              variants={ShopButtonVariants}
              initial='initial'
              animate='animate'
              className='overflow-hidden whitespace-nowrap'
            >
              SHOP NOW{' '}
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
            </ShopNowButton>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={teamKitWrapperVariants}
        initial={index === 0 ? 'currentInitial' : 'upcomingInitial'}
        animate={
          index === 0
            ? 'currentAnimate'
            : currentSlide >= index
            ? 'upcomingAnimate'
            : 'upcomingInitial'
        }
        className={`absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 z-[8] w-[25%]`}
      >
        <motion.img
          variants={teamKitImageVariants}
          initial={currentSlide === index && 'initial'}
          animate={currentSlide === index ? 'animate' : 'initial'}
          src={product.poster}
          alt={`${product.teamName} kit`}
        />
      </motion.div>
      <motion.div
        variants={SkewedRectangleVariants}
        initial='initial'
        animate={index <= currentSlide ? 'animate' : 'initial'}
        className={`w-96 right-[116px] absolute bottom-0 bg-neutral-light-grey skew-x-[14deg] z-[4]`}
      />
    </motion.div>
  )
}

const ShopNowButton = tw(
  motion.button
)`text-primary-black font-bold bg-white w-fit flex items-center justify-center py-3.5`

export default HeaderSlide
