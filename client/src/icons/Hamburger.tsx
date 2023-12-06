type Props = { width?: number; height?: number }

const Hamburger = ({ width = 30, height = 30 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 8.75H25M5 15H25M5 21.25H25'
        stroke='#262D33'
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default Hamburger
