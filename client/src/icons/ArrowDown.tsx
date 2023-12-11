type Props = {
  className?: string
  width?: number
  height?: number
  strokeClassName?: string
}

const ArrowDown = ({
  className,
  width = 14,
  height = 14,
  strokeClassName = 'stroke-primary-black'
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M1.75 4.08301L7 9.33301L12.25 4.08301'
        className={strokeClassName}
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default ArrowDown
