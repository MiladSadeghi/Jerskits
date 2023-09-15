import { forwardRef } from 'react'

type Props = {
  slide: number
  setSlide: (arg: number) => void
  maxSlide: number
}

const HeaderController = forwardRef<HTMLDivElement, Props>({ slide, setSlide, maxSlide }, ref) => {
  return <div>HeaderController</div>
}

export default HeaderController
