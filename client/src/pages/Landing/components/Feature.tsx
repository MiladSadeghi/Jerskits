import { ReactElement } from 'react'
import tw from 'twin.macro'

type TContent = {
  icon: ReactElement
  title: string
  description: string
}

const contents: TContent[] = [
  {
    icon: (
      <svg
        width='50'
        height='50'
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_355_1716)'>
          <path
            d='M31.6291 40.0365C26.409 45.2566 18.2159 45.692 12.4999 41.3426C11.9798 40.9468 11.4802 40.5115 11.0052 40.0365C10.5302 39.5615 10.0948 39.0618 9.69899 38.5417C5.34967 32.8256 5.78507 24.6327 11.0052 19.4125C16.7003 13.7174 38.9948 12.0468 38.9948 12.0468C38.9948 12.0468 37.3243 34.3413 31.6291 40.0365Z'
            stroke='black'
            strokeWidth='1.2'
          />
          <path
            d='M9.69897 38.5417C10.0948 39.0618 10.5302 39.5615 11.0052 40.0365C11.4802 40.5115 11.9798 40.9469 12.4999 41.3426C15.6248 35.4167 21.8748 28.125 30.2081 19.7917C19.3748 25.9876 13.5417 33.3333 9.69897 38.5417Z'
            fill='black'
          />
        </g>
        <defs>
          <clipPath id='clip0_355_1716'>
            <rect width='50' height='50' fill='black' />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Best Quality Material',
    description:
      'Our product is made from at least 75% recycled polyester fibres.'
  },
  {
    icon: (
      <svg
        width='50'
        height='50'
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9.33334 4.76675H40.6667C40.8876 4.76675 41.0667 4.94583 41.0667 5.16675V32.8574C41.0667 32.9779 41.0124 33.0919 40.9189 33.1679L25.2522 45.8971C25.1053 46.0165 24.8947 46.0165 24.7478 45.8971L9.08111 33.1679C8.98762 33.0919 8.93334 32.9779 8.93334 32.8574V5.16675C8.93334 4.94583 9.11243 4.76675 9.33334 4.76675Z'
          stroke='black'
          strokeWidth='1.2'
        />
        <path
          d='M16.6667 20.8334L22.9167 27.0834L34.375 16.6667'
          stroke='black'
          strokeWidth='1.2'
        />
      </svg>
    ),
    title: 'Secure payments',
    description:
      "Payments with a guaranteed level of security, you don't have to worry"
  },
  {
    icon: (
      <svg
        width='50'
        height='50'
        viewBox='0 0 50 50'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M33.3333 16.6666C33.3333 12.0642 29.6024 8.33325 25 8.33325C20.3976 8.33325 16.6667 12.0642 16.6667 16.6666M33.3333 22.9166C33.3333 27.519 29.6024 31.2499 25 31.2499C20.3976 31.2499 16.6667 27.519 16.6667 22.9166M8.33334 16.6666H41.6667V39.5833C41.6667 41.8844 39.8012 43.7499 37.5 43.7499H12.5C10.1988 43.7499 8.33334 41.8844 8.33334 39.5833V16.6666Z'
          stroke='black'
          strokeWidth='1.2'
        />
      </svg>
    ),
    title: 'Free shipping',
    description: 'Free all shipping worldwide, with applicable conditions'
  }
]

const Feature = () => {
  return (
    <Wrapper>
      {contents.map((content: TContent, index: number) => (
        <div
          key={index}
          className='relative flex flex-col items-center w-full lg:flex-row'
        >
          <Content>
            <div>{content.icon}</div>
            <ContentTitle>{content.title}</ContentTitle>
            <ContentDesc>{content.description}</ContentDesc>
          </Content>
          {index < contents.length - 1 && <Bar />}
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
