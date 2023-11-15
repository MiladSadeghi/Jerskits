type Props = {
  width?: number
  height?: number
  colorsClassName?: string
}
const Star = ({ width = 31, height = 30, colorsClassName }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 30 30'
    >
      <path
        d='M15.5 3.75L18.5418 10.8133L26.1994 11.5236L20.4217 16.5992L22.1126 24.1014L15.5 20.175L8.88742 24.1014L10.5783 16.5992L4.80061 11.5236L12.4582 10.8133L15.5 3.75Z'
        stroke='#262D33'
        className={colorsClassName}
      />
    </svg>
  )
}

export default Star
