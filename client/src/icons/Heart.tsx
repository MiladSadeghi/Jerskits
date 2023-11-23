type Props = {
  width?: number
  height?: number
  fill?: boolean
}

const Heart = ({ width = 20, height = 20, fill }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill={fill ? '#262D33' : 'none'}
      shapeRendering={'geometricPrecision'}
    >
      <path
        d='M7 4C4.23858 4 2 6.23858 2 9C2 10.1256 2.07548 11.4927 3.35671 12.9874C4.63793 14.4822 12 21.0004 12 21.0004C12 21.0004 19.3621 14.4822 20.6433 12.9874C21.9245 11.4927 22 10.1256 22 9C22 6.23858 19.7614 4 17 4C14.2386 4 12 6.23858 12 9C12 6.23858 9.76142 4 7 4Z'
        stroke='#262D33'
        strokeWidth='1'
      />
    </svg>
  )
}

export default Heart
